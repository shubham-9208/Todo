import { useEffect, useState } from 'react'
import { TodoProvider } from './Context/Context'
import Todolist from './Component/Todolist'
import Todoform from './Component/Todoform'


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }  /** mujhe ismai phele ke bhi todo agar honge to vo chaye is prev use kiya hai( jo interview wala Q kiya tha na humne)  (...) ye spread method hai taki aage ke pure aajjaye or Date unique id ke liye user kiya hai*/
   
/////-----------------------//////////////////////--------------------------------///////////
const updateTodo = (id, todo) => {
  setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
}
        // prev.map((eachvalue=>{      // ye samajhne ke liye ki update karna hai hume
        //     if (eachvalue.id === id) {
        //       todo
        //     }else{prevTodo}
        // })

        // phele settodos mai mujhe update karna hai to ki mujhe update karne ke id chiye to mai uske liye prev val liya to mujhe pura mil gya to maine usper loop laga  ke ek value leli or filter kardiya prevtodo(e) id nikali or check kiya ki match to new todo add karna nhi to prevTodo rhenedo
  ///-----------------------//////////////////------------------------------/////////////////   
  
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  /// yha per bhi delete ke pre use kiya taki id mile filter isliye use liye kiya kyu ki vo sirf true val hi return karta hai (filter bhi loop ka hi kaam karta hai ) val.id id mile jko id di hai vo match ho to use maat do baki sub dedo --> yha remove use nhi karsakte nhi to pura array hi delete hojayega
///------------------------///////////////////-------------------//////////////////---------

const toggleComplete = (id) => {
  //console.log(id);
  setTodos((prev) => 
  prev.map((prevTodo) => 
    prevTodo.id === id ? { ...prevTodo, 
      completed: !prevTodo.completed } : prevTodo))
}
  ////  vo kya hai ek object to use le liya pura for completed hai use reverse kardo match value jo id hai uski 
///////////------------------////////////////////----------------------//--- ab local storage ka kaam chalu karenge storage ke liye ki refresh ho to bho added todolist ho

///////////////////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}, [])
/// use effect use kiya hai agar localStorage mai sari value leke aaye or mere state wlae todo mai add karde jab bhi application run ho --> localStorage.getItem se data milega jo storage mai hoga or hume use bhi to display karana padge na  ('todos hai vo keys  hai')
//////////---------------//////////////------------------------------//////////////////
 
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])
  /// ismai do value dena padta hai key or string first todos key hogya second ko string main convert kiya kyu ki hamara todos to hum array mai hai lekin local storage to string leta hai isliye convert kiya hai
///////--------------//////////////////---------------////////////////---------------------------

return (
  <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <div className="mb-4">
                      
                      <Todoform />
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {todos.map((todo) => (
                        <div key={todo.id}
                        className='w-full'
                        >
                          <Todolist todo={todo} />
                        </div>
                      ))}
                  </div>
              </div>
          </div>
  </TodoProvider>
)
}

export default App
