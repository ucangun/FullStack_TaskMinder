import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const useTodoCall = () => {
  const getAllTodos = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}todo`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { getAllTodos };
};

export default useTodoCall;
