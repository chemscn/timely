import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Activity } from "../models";

interface TimeFormProps {
  onSave: (activity: Activity) => void;
}

const useStyles = makeStyles({
  box: {
    margin: 25,
    flex: 0.3,
    flexDirection: "row",
  },
  button: {
    margin: 30,
    padding: 10,
  },
  textInput: {
    flex: 1,
    width: "50%",
  },
});

export const TimeForm = ({ onSave }: TimeFormProps) => {
  const [description, setDescription] = useState<string>("");
  const classes = useStyles();

  const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value as string);
  };

  const createActivity = (): Activity => {
    const newActivity: Activity = {
      description: description,
      startTime: new Date(),
      duration: 0,
    };
    setDescription("");
    return newActivity;
  };

  const handleClearStorage = () => {
    localStorage.clear();
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
      <div className={classes.button}>
        <Button
          color="success"
          onClick={() => onSave(createActivity())}
          disabled={description.length === 0}
          variant="contained"
        >
          Start Activity
        </Button>
      </div>
      <Button color="error" onClick={handleClearStorage} variant="contained">
        Clear Storage
      </Button>
    </>
  );
};
