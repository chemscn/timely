import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Activity } from "../models";
import { Timer } from "./Timer";
import { TimeForm } from "../components";

export const ActivityTable = () => {
  const storedActivities = JSON.parse(
    localStorage.getItem("activities") || "[]"
  ) as Activity[];
  const [activities, setActivities] = useState<Activity[]>(
    storedActivities ? storedActivities : []
  );
  const handleOnStop = (seconds: number, index: number) => {
    const currentActivities = [...activities];
    const activityToModify = currentActivities[index];
    activityToModify.endTime = new Date(
      activityToModify.startTime.getTime() + seconds * 1000
    );
    activityToModify.duration = seconds;
    setActivities(currentActivities);
    localStorage.setItem("activities", JSON.stringify(activities));
  };

  const handleSaveActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
    localStorage.setItem("activities", JSON.stringify(activities));
  };
  return (
    <>
      <TimeForm onSave={handleSaveActivity} />
      <h4>Activity Table</h4>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{activity.description}</TableCell>
                <TableCell align="right">
                  {activity.startTime.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {activity.endTime?.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {!activity.endTime ? (
                    <Timer onStop={handleOnStop} index={index} />
                  ) : (
                    activity.duration
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
