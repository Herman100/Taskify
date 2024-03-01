import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

////// CRUD OPERATIONS //////
// CREATE
// handle submit || add todo item
export const handleWorkSubmit = async (e, setTodoInput, todoInput) => {
  e.preventDefault();
  setTodoInput("");
  if (todoInput.trim() !== "") {
    try {
      const docRef = await addDoc(collection(db, "work"), {
        itemtodo: todoInput,
        completed: false,
        time: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }
};

export const handlePersonalSubmit = async (e, setTodoInput, todoInput) => {
  e.preventDefault();
  setTodoInput("");
  if (todoInput.trim() !== "") {
    try {
      const docRef = await addDoc(collection(db, "personal"), {
        itemtodo: todoInput,
        completed: false,
        time: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }
};

// READ
// read todo item
export const subscribeToTodoList = (setTodoList) => {
  const q = query(collection(db, "work"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, task: doc.data() });
      setTodoList([...todos]);
    });
  });

  return unsubscribe;
};

// UPDATE COMPLETED TODO

// completed todo item
export const handleCompleted = async (
  id,
  database,
  completed,
  task,
  todoList,
  setTodoList
) => {
  try {
    completed = !completed;
    handleDelete(id, database, todoList, setTodoList);

    if (completed) {
      const docRef = await addDoc(collection(db, "completed"), {
        itemtodo: task,
        completed: completed,
        time: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    }

    console.log("Document updated ");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// read completed todo item
export const subscribeToCompletedList = (setCompletedList) => {
  const q = query(collection(db, "completed"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const completed = [];
    querySnapshot.forEach((doc) => {
      completed.push({ id: doc.id, task: doc.data() });
      setCompletedList([...completed]);
    });
  });

  return unsubscribe;
};

// READ WORK TODO && READ PERSONAL TODO

// read work todo item
export const subscribeToWorkList = (setWorkList) => {
  const q = query(collection(db, "work"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const work = [];
    querySnapshot.forEach((doc) => {
      work.push({ id: doc.id, task: doc.data() });
      setWorkList([...work]);
    });
  });

  return unsubscribe;
};

// read personal todo item
export const subscribeToPersonalList = (setPersonalList) => {
  const q = query(collection(db, "personal"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const personal = [];
    querySnapshot.forEach((doc) => {
      personal.push({ id: doc.id, task: doc.data() });
      setPersonalList([...personal]);
    });
  });

  return unsubscribe;
};

// delete todo item
export const handleDelete = async (id, database, todoList, setTodoList) => {
  setTodoList(todoList.filter((todo) => todo.id !== id));
  try {
    await deleteDoc(doc(db, `${database}`, id));

    console.log("Document deleted ");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

// edit todo item
export const handleEdit = async (
  id,
  task,
  setTodoInput,
  setTodoList,
  todoList
) => {
  setTodoInput(task);
  handleDelete(id, todoList, setTodoList);
};
