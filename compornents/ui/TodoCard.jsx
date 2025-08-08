import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TodoDelete } from "../pages/TodoDelete";

const TodoCard = ({ todo, showCheckbox, onComplete, onUncomplete, onDelete }) => {
  const { id, title, description } = todo;
  const [isCompleted, setIsCompleted] = useState(todo.status === "completed");

  const handleCheckboxClick = async (e) => {
    e.stopPropagation();
    const newChecked = !isCompleted;

    setIsCompleted(newChecked);

    try {
      const res = await fetch(
        `http://localhost:3001/api/todos/${id}/${newChecked ? "complete" : "uncomplete"}`,
        { method: "PUT" }
      );
      if (!res.ok) {
        alert("更新に失敗しました");
        setIsCompleted(!newChecked);
        return;
      }
      if (newChecked) {
        onComplete && onComplete();
      } else {
        onUncomplete && onUncomplete();
      }
    } catch (error) {
      alert("通信エラーが発生しました");
      setIsCompleted(!newChecked);
    }
  };

  return (
    <div className="border shadow-md rounded-md p-5 m-5 bg-white">
      {showCheckbox && (
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={handleCheckboxClick}
          readOnly
          className="mr-2 cursor-pointer"
          aria-label={`完了状態切替: ${title}`}
        />
      )}
      <h1 className={`text-2xl font-medium ${isCompleted ? "line-through text-gray-400" : "text-black"}`}>
        {title}
      </h1>
      <p className="pt-3 text-gray-700">{description}</p>
      <div className="flex space-x-2 mt-3">
        <TodoDelete id={id} onDeleted={onDelete} />
        <Link to={`/edit/${id}`} className="border px-3 py-1 rounded">編集</Link>
      </div>
    </div>
  );
};

export default TodoCard;
