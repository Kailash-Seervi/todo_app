import React, { useState, useEffect } from "react";
import './App.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography"
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import Drawer from './Drawer';


function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      isDone: false,
    })
    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      
      setTodo(snapshot.docs.map((doc) => {
        return {id: doc.id,todo:doc.data().todo, isDone: doc.data().isDone}
      }));
    })
  }, [])

  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  }

  const handleTaskDone = (event, data_props) => {

    db.collection("todos").doc(data_props.id).update({
      isDone: !data_props.done
    });
    console.log(todo)
   };


  return (
    <div className="App">
      <Drawer>
        <Typography variant="h4" >Your Tasks</Typography>
        <form className="add-todo-ctn" style={formStyle}>
          <TextField
            className="add-todo-input"
            label="Write a Todo"
            value={input}
            onChange={handleInputChange}
          />

          <Button
            className="add-todo-btn"
            disabled={!input}
            type="submit"
            onClick={handleAddTodo}
            variant="contained"
            color="primary"
          >
            Add to-do
          </Button>
        </form>
        <div className="Todo-list">
          {todo.map((e) => {
            return <Todo
              todo={e}
              change={handleTaskDone}
                    />;
          })}
        </div>
      </Drawer>
    </div>
  );
}

export default App;
