import { test, expect } from "vitest";

const API_URL = "http://localhost:3000/api/todos";
let targetId: number;

test("1. POST: 新規TODOを追加できるか", async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "テストタスク" }),
  });
  expect(response.status).toBe(201);
  const data = await response.json();
  expect(data.title).toBe("テストタスク");
  expect(data.done).toBe(false);
  targetId = data.id; // 以降のテストで使うためにIDを保存
});

test("2. GET: 追加したTODOが取得できるか", async () => {
  const response = await fetch(API_URL);
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);

  // さっき追加したIDを持つTODOが一覧に含まれているか
  const found = data.find((t: any) => t.id === targetId);
  expect(found).toBeDefined();
});

test("3. PUT: TODOを完了状態に更新できるか", async () => {
  const response = await fetch(`${API_URL}/${targetId}`, { method: "PUT" });
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.done).toBe(true);
});

test("4. DELETE: TODOを削除できるか", async () => {
  const response = await fetch(`${API_URL}/${targetId}`, { method: "DELETE" });
  expect(response.status).toBe(200);
});

test("5. バリデーション: 空文字を送ると 400 エラーで弾かれるか", async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "   " }), // 空白のみの不正なデータ
  });

  // サーバー側のバリデーションがちゃんと機能していれば 400 になる
  expect(response.status).toBe(400);
  const data = await response.json();
  expect(data.error).toBe("タイトルは必須です");
});