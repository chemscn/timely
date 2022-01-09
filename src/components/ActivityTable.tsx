import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ActivityData } from "../models";

export const ActivityTable = (data: ActivityData) => {
  return (
    <>
      <Box style={{ flex: 0.5, flexDirection: "row" }}>
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
              {data.activities.map((activity, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{activity.description}</TableCell>
                  <TableCell align="right">
                    {activity.startTime.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {activity.endTime.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {activity.duration.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
