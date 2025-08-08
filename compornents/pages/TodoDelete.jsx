export function TodoDelete({id}) {
    const fetchDelTodo = (id) => {
        const result=confirm('削除してもよろしいですか？')
        if (result) {
            fetch(`http://localhost:3001/api/todos/${id}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return
                })
                .then((data) => {
                    console.log("Success:", data);
                    alert("削除に成功しました");
                    navigate("/");
                })
       
        }
};
    return (
        <button className='border' onClick={()=> fetchDelTodo(id)}>削除</button>
    )
}