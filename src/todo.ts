// --- Todo 型を定義する ---
type Todo = {
  id: number;
  title: string;
  done: boolean;
};

// --- Todo の配列を作成する ---
const todos: Todo[] = [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "日報を書く", done: true },
  { id: 3, title: "TypeScriptを学ぶ", done: false },
];

// --- 一覧を表示する関数 ---
const showTodos = (todos: Todo[]): void => {
  for (const todo of todos) {
    const status = todo.done ? "✅" : "⬜";
    console.log(`${status} [${todo.id}] ${todo.title}`);
  }
};

// --- 実行 ---
console.log("=== TODO 一覧 ===");
showTodos(todos);

// --- Todo を追加する関数 ---
const addTodo = (todos: Todo[], title: string): Todo[] => {
  const newId = todos.length + 1;
  const newTodo: Todo = { id: newId, title: title, done: false };
  return [...todos, newTodo];
};

// --- 追加して再表示 ---
const updatedTodos = addTodo(todos, "掃除をする");

console.log("");
console.log("=== 追加後の TODO 一覧 ===");
showTodos(updatedTodos);
