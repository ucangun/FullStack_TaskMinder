import { useEffect, useState } from "react";
import useTodoCall from "../hooks/useTodoCall";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const { getAllTodos, createNewTodo } = useTodoCall();

  // UseEffect to fetch all todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedData = await getAllTodos();
      console.log(fetchedData);
      setTodos(fetchedData);
    };
    fetchTodos();
  }, []);

  const handleClick = async () => {
    if (todo) {
      const newTodo = {
        text: todo,
        completed: false,
      };
      const createdTodo = await createNewTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const actualTodos = todos.filter((todo) => todo.id !== id);
    setTodos(actualTodos);
    localStorage.setItem("todos", JSON.stringify(actualTodos));
  };

  const handleCheck = (id) => {
    const actualTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(actualTodos);
    localStorage.setItem("todos", JSON.stringify(actualTodos));
  };

  return (
    <div className="todoList">
      <div className="todoList-input">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleClick}>+</button>
      </div>
      <div className="todoList-container">
        {todos?.map(({ id, text, completed }) => (
          <div className={`todo ${completed ? "completed" : ""}`} key={id}>
            <p className={completed ? "line" : ""}>{text}</p>
            <div className="resultBox">
              <i
                className="fa-solid fa-check"
                onClick={() => handleCheck(id)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
