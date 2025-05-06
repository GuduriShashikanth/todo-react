import { useState,useEffect } from "react";
import NavBar from "./components/NavBar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState([]);
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveToLS=(params) => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  };
  const toggleFinished=() => { 
    setShowFinished(!showFinished)
  }
  const handleEdit = (e,id) => {

    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
  
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };

  return  (
    <>
      <NavBar />
      <div className="md:container mx-auto my-4 rounded-xl p-4 bg-violet-100 min-h-[70vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">iTask - Manage your Todo's at one place</h1>
        <div className="addTodo flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a Todo </h2>
          
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            className="px-2 py-1 bg-white rounded-lg border-solid border-2 border-black " 
          />
          <button
            onClick={handleAdd} disabled={todo.length<3}
            className="bg-violet-800 py-1 rounded-lg font-bold hover:bg-violet-950 text-white "
          >
            Save
          </button>
        </div>
        <input  type="checkbox" name="" onChange={toggleFinished} checked={showFinished} id="" /> Show Finished
        <h2 className="text-lg font-bold">Your todos</h2>

        <div className="todos">
          {todos.length == 0 && <div>No Todos to display</div>}
          {todos.map((items) => {
            return( showFinished || !items.isCompleted) && (
              <div
                key={items.id}
                className="todo flex justify-between py-1 md:w-1/2"
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={handleCheckBox}
                    checked={items.isCompleted}
                    name={items.id}
                    id=""
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>handleEdit(e,items.id)}
                    className="bg-violet-800 p-1 px-2 rounded-md mx-1 font-bold hover:bg-violet-950 text-white "
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-violet-800 p-1 px-2 rounded-md mx-1 font-bold hover:bg-violet-950 text-white "
                  >
                    <MdDelete />

                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
