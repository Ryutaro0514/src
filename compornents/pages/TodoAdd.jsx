import React, { useRef } from 'react'
import { useNavigate } from "react-router";

const TodoAdd = () => {
  const inputTitleRef = useRef(null)
  const inputDesRef = useRef(null)
  let navigate = useNavigate();
  const AddTask = () => {
    
    const title = inputTitleRef.current.value
    const description= inputDesRef.current.value
    fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      })
    })
    .then((response) =>{
      if(!response.ok){
      throw new Error("NetWork resposise was not ok");
      }
      return response.json() ;
    })
    .then((data)=>{
      console.log("Success:",data);
      alert("追加に成功しました")
      navigate("/");
    })
    .catch((error)=>{
      console.error("Error",error);
      alert("ToDoの追加に失敗しました")
      return;
    })
}
return (
  <>
    <div>追加</div>
    <button className='border rounded-sm' onClick={AddTask}>追加</button>
    <input type="text" className='border rounded-sm' ref={inputTitleRef} />
    <input type="text" className='border rounded-sm' ref={inputDesRef} />
  </>
)
}

export default TodoAdd