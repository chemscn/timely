import React, { useState } from "react";
import { ActivityTable } from "./components";
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

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Paper className={classes.container} elevation={3}>
        <h1>Welcome to Timely</h1>
        <ActivityTable />
      </Paper>
    </div>
  );
};

export default App;
