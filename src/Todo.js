import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// <Checkbox
//   checked={checked}
//   onChange={handleChange}
//   inputProps={{ "aria-label": "primary checkbox" }}
// />;

function to_do(props) {
    const rowstyle = {
        display: 'block',
    }
    return (
      <FormControlLabel
        style={rowstyle}
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label={props.todo}
      />
    );
}

export default to_do;
