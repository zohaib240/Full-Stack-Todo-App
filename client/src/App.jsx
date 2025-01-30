import axios from "axios";
import { useState, useRef, useEffect } from "react";

function App() {
  const title = useRef();
  const description = useRef();
  const [todos, setTodos] = useState([]); // Correct useState usage

// data call from database

useEffect(() => {
  
  axios("http://localhost:5000/api/v1/alltodos")
  .then((res) => {
    console.log(res.data.todos)
    setTodos(res.data.todos);
  }).catch((err) => {
    console.log(err);
  })

}, [])

const addTodo = async (event) => {
  event.preventDefault();
  if (!title.current.value || !description.current.value) {
    console.log('Please enter todo title and description');
    return
  }
  try {
    const res = await axios.post("http://localhost:5000/api/v1/todos", {
      title: title.current.value,
      description: description.current.value,
    });

    console.log("Response Data:", res.data.todo);
    const newTodo = res.data.todo
    setTodos ((preTodo)=> [...preTodo,newTodo])

    title.current.value = ""; // Clear input
    description.current.value = ""; // Clear input
  } catch (err) {
    console.log("Error:", err);
  }
};



  // Delete Todo
  const deleteTodo = async (id) => {
    console.log("Deleting todo with id:", id); // Debugging
   try {
    const res = await axios.delete(`http://localhost:5000/api/v1/del/${id}`)
    console.log(res.data);
    
    setTodos((preTodos) => preTodos.filter((todo) => todo._id !== id))
   } catch (error) {
    console.log(error);
    
   }
  };

  // Edit Todo
  const editTodo = async (id) => {
    const title = prompt("update title")
   try {
    const res = await axios.put(`http://localhost:5000/api/v1/edit/${id}`,{
      title,
    })
    console.log(res);
    setTodos(preTodos => preTodos.map(todo => todo._id === id ? { ...todo, title: res.data.todo.title } : todo));
  } catch (error) {
   }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md bg-yellow-50 shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-700 mb-6 text-center">
          Todo App
        </h1>
  
        <form onSubmit={addTodo} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            ref={title}
            placeholder="Enter the title"
            className="p-3 border-2 border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <textarea
            ref={description}
            placeholder="Enter the description"
            className="p-3 border-2 border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Add Todo
          </button>
        </form>
  
        {todos.length > 0 ? (
          <ul className="space-y-3">
            {todos.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-yellow-200 px-4 py-3 rounded-md shadow"
              >
                <div>
                  <h2 className="text-yellow-800 font-medium">{item.title}</h2>
                  <p className="text-yellow-600 text-sm">{item.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => editTodo(item._id)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-800 font-medium">No todos available!</p>
        )}
      </div>
    </div>
  )
}


export default App
