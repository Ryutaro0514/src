import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
export default function EditTodo() {
  const { id } = useParams();
  const inputTitleRef = useRef(null);
  const inputDesRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "GEt"
    })
    
    .then(res => res.json())
    .then(json => {
      inputTitleRef.current.value = json.title
      inputDesRef.current.value = json.description
    })
})


const fetchTodoEdit = () => {
  const title = inputTitleRef.current.value;
  const description = inputDesRef.current.value;
  fetch(`http://localhost:3001/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("NetWork resposise was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert("変更に成功しました")
      navigate("/");
    })
  // .catch((error) => {
  //   console.error("Error", error);
  //   alert("ToDoの変更に失敗しました")
  //   return;
  // })
}
return (
  <>
    <input type="text" className="border" ref={inputTitleRef} />
    <input type="text" className="border" ref={inputDesRef} />
    <button onClick={fetchTodoEdit}>保存</button>
  </>
)
}
