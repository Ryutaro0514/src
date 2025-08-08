import React, { useEffect, useState } from "react";
import TodoCard from "../ui/TodoCard";
import { Link } from "react-router-dom";

export function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchAllTodos = () => {
    fetch("http://localhost:3001/api/todos")
      .then(res => res.json())
      .then(setTodos)
      .catch(console.error);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const handleComplete = () => fetchAllTodos();
  const handleUncomplete = () => fetchAllTodos();

  const handleDelete = async (id) => {
    const ok = window.confirm("本当に削除してよろしいですか？");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:3001/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("削除に失敗しました");
        return;
      }
      fetchAllTodos();
    } catch (error) {
      alert("削除時にエラーが発生しました");
      console.error(error);
    }
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === "all") return true;
      if (filterStatus === "completed") return todo.status === "completed";
      if (filterStatus === "uncomplete") return todo.status !== "completed";
      return true;
    })
    .filter(todo => {
      if (!searchText) return true;
      const lower = searchText.toLowerCase();
      return (
        (todo.title && todo.title.toLowerCase().includes(lower)) ||
        (todo.description && todo.description.toLowerCase().includes(lower))
      );
    });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortKey === "title") return (a.title || "").localeCompare(b.title || "");
    if (sortKey === "status") return (a.status === "completed") - (b.status === "completed");
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-white text-black p-5">
      <div className="flex flex-wrap items-center space-x-2 space-y-2 mb-4">
        <Link to="/add" className="border bg-teal-300 shadow-lg/20 w-fit p-2 rounded">追加ページへ</Link>

        <button onClick={() => setShowCheckbox(prev => !prev)} className="border bg-teal-300 shadow-lg/20 w-fit p-2 rounded">
          状態変更
        </button>

        <input
          type="text"
          placeholder="検索..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="border rounded p-2 w-48"
        />

        <select
          value={sortKey}
          onChange={e => setSortKey(e.target.value)}
          className="border rounded p-2"
        >
          <option value="createdAt">作成日順</option>
          <option value="title">タイトル順</option>
          <option value="status">完了状態順</option>
        </select>

        <button onClick={() => setSortOrder(o => (o === "asc" ? "desc" : "asc"))} className="border px-3 py-2 rounded">
          {sortOrder === "asc" ? "昇順" : "降順"}
        </button>
      </div>

      <div className="flex flex-wrap space-x-2 space-y-2 mb-6">
        <button
          className={`border px-4 py-2 rounded ${filterStatus === "all" ? "bg-teal-500 text-white" : ""}`}
          onClick={() => setFilterStatus("all")}
        >
          全て
        </button>
        <button
          className={`border px-4 py-2 rounded ${filterStatus === "uncomplete" ? "bg-teal-500 text-white" : ""}`}
          onClick={() => setFilterStatus("uncomplete")}
        >
          未完了
        </button>
        <button
          className={`border px-4 py-2 rounded ${filterStatus === "completed" ? "bg-teal-500 text-white" : ""}`}
          onClick={() => setFilterStatus("completed")}
        >
          完了
        </button>
      </div>

      <div>
        {sortedTodos.map(todo => (
          <TodoCard
            key={todo.id}
            className="border shadow-md rounded-md p-5 m-5 bg-white"
            todo={todo}
            showCheckbox={showCheckbox}
            onComplete={handleComplete}
            onUncomplete={handleUncomplete}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
