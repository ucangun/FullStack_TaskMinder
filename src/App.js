import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="container">
      <Header />
      <Welcome />
      <TodoList />
    </div>
  );
}

export default App;
