import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Activity } from "../models";
import { Timer } from "./Timer";
import { TimeForm } from "../components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ActivityTable = () => {
  //Check storage and get activities
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

  const handleClearStorage = () => {
    localStorage.clear();
  };
  return (
    <>
      <TimeForm
        onClearStorage={handleClearStorage}
        onSave={handleSaveActivity}
      />
      <h4>Activity Table</h4>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Duration (seconds)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="test-table-body">
            {activities.map((activity, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="right">
                  <div data-testid="test-description-cell">
                    {activity.description}
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  data-testid="test-startTime-cell"
                  align="right"
                >
                  {activity.startTime.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {activity.endTime?.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell data-testid="test-duration-cell" align="right">
                  {!activity.endTime ? (
                    <Timer onStop={handleOnStop} index={index} />
                  ) : (
                    activity.duration
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
