// 公開APIからTODOデータを取得する例
// JSONPlaceholder: テスト用の無料API

type TodoFromAPI = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const fetchTodos = async (): Promise<void> => {
  console.log("APIからTODOを取得中...");

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );
  const todos: TodoFromAPI[] = await response.json();

  console.log(`${todos.length} 件取得しました`);
  console.log("");

  for (const todo of todos) {
    const status = todo.completed ? "✅" : "⬜";
    console.log(`${status} [${todo.id}] ${todo.title}`);
  }
};

fetchTodos();
