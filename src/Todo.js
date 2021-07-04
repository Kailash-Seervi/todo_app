import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import db from './firebase';
import Modal from './Modal';
import './Todo.css';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


// <Checkbox
//   checked={checked}
//   onChange={handleChange}
//   inputProps={{ "aria-label": "primary checkbox" }}
// />;

function to_do(props) {
    const listStyle = {
        width: '90%',
    }

    const actionBtnStyle = {
        display: 'inline-flex'
    }

    const lineThrough = props.todo.isDone
      ? { textDecoration: "line-through", color: "#858585" }
      : null;

    const checkBox = (
      <FormControlLabel
        control={
          <Checkbox
            checked={props.todo.isDone}
            onChange={(event) =>
              props.change(event, {
                id: props.todo.id,
                done: props.todo.isDone,
              })
            }
            name="checkedB"
            color="primary"
          />
        }
        label={null}
      />
    );


    return (
      <ListItem className="todo-list-item" style={listStyle}>
        {checkBox}
        <ListItemText
          className="ListItemText"
          primary={props.todo.todo}
          secondary="Some dummy deadline"
          style={lineThrough}
        />
        <div style={actionBtnStyle}>
          <Modal todo={props.todo.todo} id={props.todo.id} />
          <DeleteForeverIcon
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
            className="deleteBtnStyle"
          ></DeleteForeverIcon>
        </div>
      </ListItem>
    );
}

export default to_do;
