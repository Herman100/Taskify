import { useEffect, useState } from "react";
import {
  handlePersonalSubmit,
  handleWorkSubmit,
} from "../../firebase/getFirebaseData/firebase_crud";
import Footer from "../Footer/Footer";
import "./styles/todo.css";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";

export default function CreateTodo() {
  const [todoInput, setTodoInput] = useState("");

  function handleTodoInput(e) {
    setTodoInput(e.target.value);
  }

  return (
    <ProtectedRoute>
      <div className="container">
        <h1 className="todo-heading">My Todo List</h1>
        <div className="layout">
          <form
            onSubmit={(e) => handlePersonalSubmit(e, setTodoInput, todoInput)}
          >
            <input
              type="text"
              placeholder="create new task"
              name="todoInput"
              id="todoInput"
              value={todoInput}
              onInput={(e) => handleTodoInput(e)}
            />
            <button
              className="add-button"
              type="button"
              onClick={(e) => handlePersonalSubmit(e, setTodoInput, todoInput)}
            >
              Personal
            </button>
            <button
              className="add-button"
              type="button"
              onClick={(e) => handleWorkSubmit(e, setTodoInput, todoInput)}
            >
              Work
            </button>
          </form>
        </div>
        <Footer className="footer" />
      </div>
    </ProtectedRoute>
  );
}
