import React, { useState, useEffect } from "react";
import './App.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

// import "@fontsource/roboto";



function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodo(snapshot.docs.map((doc) => doc.data().todo));
    })
  }, [])

  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }


  return (
    <div className="App">
      <h1>TO-DO App</h1>
      <form style={formStyle}>
        <TextField
          label="Write a Todo"
          value={input}
          onChange={handleInputChange}
        />

        <Button
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
          return <Todo todo={e} />;
        })}
      </div>
    </div>
  );
}

export default App;
