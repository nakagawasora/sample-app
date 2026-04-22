import express from "express";
import Database from "better-sqlite3";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

const db = new Database("todo.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

type TodoRow = {
  id: number;
  title: string;
  done: number;
};

app.get("/api/todos", (_req, res) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY id DESC")
    .all() as TodoRow[];
  const result = todos.map((t) => ({
    id: t.id,
    title: t.title,
    done: t.done === 1,
  }));
  res.json(result);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "タイトルは必須です" });
    return;
  }
  if (title.trim().length > 100) {
    res.status(400).json({ error: "タイトルは100文字以内にしてください" });
    return;
  }
  const stmt = db.prepare("INSERT INTO todos (title) VALUES (?)");
  const info = stmt.run(title.trim());
  res
    .status(201)
    .json({ id: info.lastInsertRowid, title: title.trim(), done: false });
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(Number(id)) as TodoRow | undefined;
  if (!todo) {
    res.status(404).json({ error: "見つかりません" });
    return;
  }
  const newDone = todo.done === 1 ? 0 : 1;
  db.prepare("UPDATE todos SET done = ? WHERE id = ?").run(newDone, Number(id));
  res.json({ id: todo.id, title: todo.title, done: newDone === 1 });
});

// --- DELETE /api/todos/:id: 削除 ---
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const result = db.prepare("DELETE FROM todos WHERE id = ?").run(Number(id));

  if (result.changes === 0) {
    res.status(404).json({ error: "見つかりません" });
    return;
  }

  res.json({ message: "削除しました" });
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
