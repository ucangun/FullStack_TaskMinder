import { useEffect, useState } from "react";
import useTodoCall from "../hooks/useTodoCall";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const { getAllTodos, createNewTodo, editTodo, deleteTodo } = useTodoCall();

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

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    const updatedTodos = await getAllTodos();
    setTodos(updatedTodos);
  };

  const handleCheck = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    await editTodo(id, updatedTodo);

    const updatedTodos = await getAllTodos();
    setTodos(updatedTodos);
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
        {todos?.map(({ _id, text, completed }) => (
          <div className={`todo ${completed ? "completed" : ""}`} key={_id}>
            <p className={completed ? "line" : ""}>{text}</p>
            <div className="resultBox">
              <i
                className="fa-solid fa-check"
                onClick={() => handleCheck(_id)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(_id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
