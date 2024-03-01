import React, { useCallback, useEffect, useState } from "react";
import {
  subscribeToWorkList,
  handleCompleted,
  handleDelete,
  handleEdit,
} from "../../../firebase/getFirebaseData/firebase_crud";

import styles from "./work.module.css";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDownSquare } from "react-icons/ai";
import Footer from "../../Footer/Footer";
import ProtectedRoute from "../../../ProtectedRoute/ProtectedRoute";

function Work() {
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToWorkList(setWorkList);
    return () => unsubscribe();
  }, []);

  const handleCompletedChange = useCallback(
    (todo) => () =>
      handleCompleted(
        todo.id,
        "work",
        todo.task.completed,
        todo.task.itemtodo,
        workList,
        setWorkList
      ),
    [workList, setWorkList]
  );

  const handleDeleteClick = useCallback(
    (todo) => () => handleDelete(todo.id, "work", workList, setWorkList),
    [workList, setWorkList]
  );

  return (
    <>
      <ProtectedRoute>
        <div className={styles.container}>
          <h3 className={styles.heading}>Work Tasks</h3>
          <div className={styles.workList}>
            <h2>all work todos</h2>
            <div className={styles.todo}>
              {workList.length === 0 ? (
                <h3 className={styles.empty}>You have no work tasks</h3>
              ) : (
                workList.map((todo) => (
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
