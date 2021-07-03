import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import db from './firebase';
import Modal from './Modal';

// <Checkbox
//   checked={checked}
//   onChange={handleChange}
//   inputProps={{ "aria-label": "primary checkbox" }}
// />;

function to_do(props) {
    const listItemStyle = {
        width: '60%'
    }


    return (
      <ListItem style={listItemStyle}>
        <ListItemText
          primary={props.todo.todo}
          secondary="Some dummy deadline"
        />
        <Modal todo={props.todo.todo} id={props.todo.id} />
        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          className="deleteBtnStyle"
        ></DeleteForeverIcon>
      </ListItem>
    );
}

export default to_do;
