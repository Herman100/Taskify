import React, { useCallback, useEffect, useState } from "react";
import { subscribeToCompletedList } from "../../../firebase/getFirebaseData/firebase_crud";
import styles from "./completedtasks.module.css";
import { GoTrash } from "react-icons/go";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Footer from "../../Footer/Footer";
import ProtectedRoute from "../../../ProtectedRoute/ProtectedRoute";

function CompletedTasks() {
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToCompletedList(setCompletedList);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, completedList, setCompletedList) => {
    setCompletedList(completedList.filter((todo) => todo.id !== id));
    try {
      await deleteDoc(doc(db, "completed", id));

      console.log("Document deleted ", id);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <div className={styles.container}>
          <h3 className={styles.heading}>Completed Tasks, Hurray!</h3>
          <div className={styles.completedlist}>
            <div className={styles.todo}>
              {completedList.length === 0 ? (
                <h3 className={styles.empty}>
                  You have not completed any tasks
                </h3>
              ) : (
                completedList.map((todo) => (
                  <div key={todo.id} className={styles.todo_item}>
                    <h3 className="heading">{todo.task.itemtodo}</h3>
                    <button
                      type="button"
                      onClick={(e) =>
                        handleDelete(todo.id, completedList, setCompletedList)
                      }
                      className={styles.delete}
                    >
                      <GoTrash />
                    </button>
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

export default CompletedTasks;
