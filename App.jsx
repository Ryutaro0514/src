import './App.css'
import TodoCard from './compornents/ui/TodoCard'
import { TodoListPage } from './compornents/pages/TodoListPage'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import TodoAdd from './compornents/pages/TodoAdd'
import TodoEdit from './compornents/pages/TodoEdit'

function App() {


  return (
    <>
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoListPage />} />
      <Route path='/add' element={<TodoAdd />} />
      <Route path='/edit/:id' element={<TodoEdit />} />
    </Routes>
  </BrowserRouter>
  
    </>
  )
}

export default App
