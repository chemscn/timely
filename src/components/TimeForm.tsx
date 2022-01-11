import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Activity } from "../models";

interface TimeFormProps {
  onSave: (activity: Activity) => void;
  onClearStorage: () => void;
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

export const TimeForm = ({ onSave, onClearStorage }: TimeFormProps) => {
  const [description, setDescription] = useState<string>("");
  const classes = useStyles();

  const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const inputValue = event.target.value as string;
      setDescription(inputValue);
    }
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

  return (
    <>
      <Box className={classes.box} component="form" autoComplete="off">
        <TextField
          data-testid="description-input"
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
          data-testid="start-activity-button"
          color="success"
          onClick={() => onSave(createActivity())}
          variant="contained"
        >
          Start Activity
        </Button>
      </div>
      <Button
        data-testid="clear-storage-button"
        color="error"
        onClick={onClearStorage}
        variant="contained"
      >
        Clear Storage
      </Button>
    </>
  );
};
