import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const useTodoCall = () => {
  // Get all todos
  const getAllTodos = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}todo`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  // Create a new todo
  const createNewTodo = async (newTodo) => {
    try {
      const { data } = await axios.post(`${baseUrl}todo`, newTodo);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Edit an existing todo
  const editTodo = async (todoId, updatedTodo) => {
    try {
      const { data } = await axios.put(`${baseUrl}todo/${todoId}`, updatedTodo);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (todoId) => {
    try {
      const { data } = await axios.delete(`${baseUrl}todo/${todoId}`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return { getAllTodos, createNewTodo, editTodo, deleteTodo };
};

export default useTodoCall;
