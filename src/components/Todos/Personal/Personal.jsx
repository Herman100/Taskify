import React, { useCallback, useEffect, useState } from "react";
import {
  subscribeToPersonalList,
  handleCompleted,
  handleDelete,
  handleEdit,
} from "../../../firebase/getFirebaseData/firebase_crud";
import styles from "./personal.module.css";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDownSquare } from "react-icons/ai";
import Footer from "../../Footer/Footer";
import ProtectedRoute from "../../../ProtectedRoute/ProtectedRoute";

function Work() {
  const [personalList, setPersonalList] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToPersonalList(setPersonalList);
    return () => unsubscribe();
  }, []);

  const handleCompletedChange = useCallback(
    (todo) => () =>
      handleCompleted(
        todo.id,
        "personal",
        todo.task.completed,
        todo.task.itemtodo,
        personalList,
        setPersonalList
      ),
    [personalList, setPersonalList]
  );

  const handleDeleteClick = useCallback(
    (todo) => () =>
      handleDelete(todo.id, "personal", personalList, setPersonalList),
    [personalList, setPersonalList]
  );

  return (
    <>
      <ProtectedRoute>
        <div className={styles.container}>
          <h3 className={styles.heading}>Personal Tasks</h3>
          <div className={styles.personalList}>
            <h2>all personal todos</h2>
            <div className={styles.todo}>
              {personalList.length === 0 ? (
                <h3 className={styles.empty}>You have no personal tasks</h3>
              ) : (
                personalList.map((todo) => (
                  <div key={todo.id} className={styles.todo_item}>
                    <h3 className={styles.item_heading}>
                      {todo.task.itemtodo}
                    </h3>
                    <div className={styles.editors}>
                      <button
                        type="button"
                        className={styles.checkbox}
                        name="edit"
                        onClick={handleCompletedChange(todo)}
                      >
                        <AiOutlineDownSquare />
                      </button>

                      {/* <button
                      type="button"
                      // onClick={handleEditClick}
                      className="edit"
                    >
                    <FiEdit />
                  </button> */}
                      <button
                        type="button"
                        onClick={handleDeleteClick(todo)}
                        className={styles.delete}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <Footer className="footer" />
        </div>
      </ProtectedRoute>
    </>
  );
}

export default Work;
