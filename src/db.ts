import Database from "better-sqlite3";

// --- データベースに接続 ---
const db = new Database("todo.db");

// --- テーブルを作る（なければ作る） ---
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// --- 型を定義 ---
type TodoRow = {
  id: number;
  title: string;
  done: number;  // SQLite は boolean を 0/1 で扱う
};

// --- TODO を追加する ---
const addTodo = (title: string): void => {
  const stmt = db.prepare("INSERT INTO todos (title) VALUES (?)");
  stmt.run(title);
  console.log(`追加: ${title}`);
};

// --- TODO 一覧を取得する ---
const getAllTodos = (): TodoRow[] => {
  const stmt = db.prepare("SELECT * FROM todos");
  return stmt.all() as TodoRow[];
};

// --- TODO 一覧を表示する ---
const showTodos = (): void => {
  const todos = getAllTodos();
  if (todos.length === 0) {
    console.log("TODOはありません");
    return;
  }
  for (const todo of todos) {
    const status = todo.done ? "✅" : "⬜";
    console.log(`${status} [${todo.id}] ${todo.title}`);
  }
};

// --- 実行する ---
console.log("=== TODO を追加 ===");
addTodo("牛乳を買う");
addTodo("日報を書く");
addTodo("掃除をする");

console.log("");
console.log("=== TODO 一覧 ===");
showTodos();

// --- データベースを閉じる ---
db.close();