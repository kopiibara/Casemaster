import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  TextField,
  Divider,
  Checkbox,
} from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState<string[]>([]);

  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  return (
    <Stack spacing={0.5} className="flex items-start justify-between">
      <Typography variant="h6" className="text-[#0F2043]">
        My Notes
      </Typography>
      <Button
        variant="text"
        sx={{ textTransform: "none", color: "#878FA1" }}
        onClick={handleAddNote}
      >
        + Add New
      </Button>
      <Divider className="w-[calc(100%-0rem)] pt-1" />
      {notes.map((note, index) => (
        <Stack direction={"row"}>
          <Checkbox></Checkbox>
          <TextField key={index} variant="outlined" fullWidth size="small" />
        </Stack>
      ))}
    </Stack>
  );
};

export default Notes;
