import React from "react";
import { ActivityTable, TimeForm } from "./components";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Activity } from "./models";

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 25,
  },
});
const activities: Activity[] = [
  {
    startTime: new Date(),
    endTime: new Date(),
    duration: new Date(),
    description: "cool stuff",
  },
  {
    startTime: new Date(),
    endTime: new Date(),
    duration: new Date(),
    description: "cool stuff 2",
  },
];
const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Paper className={classes.container} elevation={3}>
        <h1>Welcome to Timely</h1>
        <TimeForm />
        <ActivityTable activities={activities} />
      </Paper>
    </div>
  );
};

export default App;
