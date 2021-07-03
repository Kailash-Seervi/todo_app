import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";
import db from "./firebase";
import firebase from 'firebase';
import EditIcon from "@material-ui/icons/Edit";




function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function EditModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo)

    const handleOpen = () => {
      setInput(props.todo);
      setOpen(true);
    };

    const handleClose = () => {
        setInput(input);
        setOpen(false);
    };

    const editBtnStyle = {
      width: "auto",
    };

    const handleUpdateTodo = (event) => {
        event.preventDefault();
        db.collection("todos")
            .doc(props.id)
            .update({
                todo: input, timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setOpen(false);
    };

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <form className="edit-todo-form">
          <TextField
            id="outlined-search"
            label="Edit Todo"
            type="search"
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
                <Button
            disabled={!input}
            type="submit"
            onClick={handleUpdateTodo}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </form>
      </div>
    );

    return (
      <div>
        <EditIcon
          style={editBtnStyle}
          onClick={handleOpen}
        >
          Edit
        </EditIcon>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
}

export default EditModal;