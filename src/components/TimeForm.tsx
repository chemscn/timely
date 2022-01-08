import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

interface TimeFormProps {}

const useStyles = makeStyles({
  textInput: {
    flex: 1,
    width: "50%",
  },
  box: {
    margin: 25,
  },
});

export const TimeForm = () => {
  const [description, setDescription] = useState<string>("");
  const classes = useStyles();
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <Box className={classes.box} component="form" autoComplete="off">
        <TextField
          className={classes.textInput}
          required
          id="outlined-required"
          label="Enter a description"
          value={description}
          onChange={handleTextInput}
        />
      </Box>
      <Box>
        <Button disabled={description.length === 0} variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
};
