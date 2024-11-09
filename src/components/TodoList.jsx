import { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleClick = () => {
    if (todo) {
      const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false,
      };
      const actualTodos = [...todos, newTodo];
      setTodos(actualTodos);
      localStorage.setItem("todos", JSON.stringify(actualTodos));
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
        {todos.map(({ id, text, completed }) => (
          <div className={` todo ${completed ? "completed" : ""}`} key={id}>
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
