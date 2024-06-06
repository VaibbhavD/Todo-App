import { useEffect, useState } from 'react'
import { Todoprovider } from './Context/TodoContext'
import './App.css'
import { TodoForm, TodoItem } from './component'

function App() {
  const [todos, settodos] = useState([])

  const addTodo=(todo)=>{
    settodos((prev)=>[...prev,{...todo}])
  }

  const updatetodo=(id,todo)=>{
  settodos((prev)=>prev.map((prevtodo)=>(prevtodo.id===id?todo:prevtodo)))
  }

  const deletetodo=(id)=>{
    settodos((prev)=>prev.filter((prevtodo)=>(prevtodo.id!==id)))
  }

  const toggleCompleted=(id)=>{
    settodos((prev)=>prev.map((prevtodo)=>(prevtodo.id===id?{...prevtodo, completed:!prevtodo.completed}:prevtodo)))
  }


  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
    settodos(todos)
    }
  },[])


  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  return (
    <Todoprovider value={{todos,addTodo,updatetodo,deletetodo,toggleCompleted}}>
      <div className="bg-[#172842] h-screen w-screen py-8 m-0">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2"> Todos </h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div className="w-full" key={todo.id}>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
