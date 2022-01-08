import React from "react";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
function App() {
  return (
    <div className="App">
      <h1>Timely :)</h1>
      <Chip
        color="error"
        label="Custom delete icon"
        deleteIcon={<DeleteIcon />}
        onDelete={() => console.log("delete")}
      />
    </div>
  );
}

export default App;
