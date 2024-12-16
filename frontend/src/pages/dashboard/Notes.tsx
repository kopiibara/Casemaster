import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Checkbox,
  IconButton,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/StrikethroughS";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Icon from "../../assets/dashboard-icon.svg";

const Notes = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[][]>([]); // Store formats for each note
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  ); // Track the selected note index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track the hovered note index

  const handleAddNote = () => {
    setNotes([...notes, ""]);
    setValues([...values, ""]);
    setFormats([...formats, []]); // Add an empty format array for the new note
    setSelectedNoteIndex(notes.length); // Set the new note as the selected note
  };

  const handleChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleFormat = (event: any, newFormats: string[]) => {
    if (selectedNoteIndex !== null) {
      const updatedFormats = [...formats];
      updatedFormats[selectedNoteIndex] = newFormats; // Update format for the selected note
      setFormats(updatedFormats);
    }
  };

  const handleSelectNote = (index: number) => {
    setSelectedNoteIndex(index); // Set the clicked note as the selected note
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);

    const updatedFormats = [...formats];
    updatedFormats.splice(index, 1);
    setFormats(updatedFormats);
  };

  return (
    <Box className="flex flex-col w-full h-full">
      <Stack
        spacing={1}
        sx={{
          height: "100%",
          maxHeight: "25rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} spacing={1.5} alignItems="center">
          {" "}
          <img src={Icon} alt="icon" width={32} />
          <Typography variant="h6" className="text-[#0F2043]">
            My Notes
          </Typography>
        </Stack>

        <Button
          variant="text"
          sx={{ textTransform: "none", color: "#878FA1" }}
          onClick={handleAddNote}
        >
          + Add New
        </Button>
        <Divider className="w-[calc(100%-0rem)] pt-1" />
        <Box
          sx={{
            flexGrow: 1, // Push toggle button to the bottom
            overflowY: notes.length > 5 ? "scroll" : "auto",
            paddingX: 2,
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D9D9D9",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#909090",
              },
            },
          }}
        >
          {/* Reverse order of notes to make newest on top */}
          {[...notes].reverse().map((note, index) => {
            const actualIndex = notes.length - 1 - index; // Correct index for original order
            return (
              <Box
                key={actualIndex}
                onMouseEnter={() => setHoveredIndex(actualIndex)} // Show button when hovering over a note
                onMouseLeave={() => setHoveredIndex(null)} // Hide button when mouse leaves
                sx={{ position: "relative" }}
              >
                <Stack direction={"row"} alignItems="center">
                  <Checkbox size="small" />
                  <input
                    type="text"
                    value={values[actualIndex]}
                    onChange={(e) => handleChange(actualIndex, e.target.value)}
                    placeholder="Enter your note here..."
                    onClick={() => handleSelectNote(actualIndex)} // Set this note as the selected one
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      display: "block",
                      width: "100%",
                      fontWeight: formats[actualIndex].includes("bold")
                        ? "bold"
                        : "normal",
                      fontStyle: formats[actualIndex].includes("italic")
                        ? "italic"
                        : "normal",
                      textDecoration: formats[actualIndex].includes(
                        "underlined"
                      )
                        ? "underline"
                        : formats[actualIndex].includes("strikethrough")
                        ? "line-through"
                        : "none",
                    }}
                  />
                  {hoveredIndex === actualIndex && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#F44336",
                      }}
                      onClick={() => handleDeleteNote(actualIndex)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                {index < notes.length - 1 && (
                  <Divider sx={{ marginY: 1 }} className="w-[100%]" />
                )}
              </Box>
            );
          })}
        </Box>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />{" "}
      {/* Spacer to push toggle button to the bottom */}
      {notes.length > 0 && (
        <Stack
          spacing={1.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: 1,
          }}
        >
          <Divider className="w-[calc(100%-0rem)] pt-1" />
          <ToggleButtonGroup
            value={selectedNoteIndex !== null ? formats[selectedNoteIndex] : []} // Only show formats for the selected note
            onChange={handleFormat}
            aria-label="text formatting"
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                minWidth: "40px",
                padding: "4px",
              },
              "& svg": {
                fontSize: "1.2rem",
              },
            }}
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="strikethrough" aria-label="strikethrough">
              <FormatStrikethroughIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      )}
    </Box>
  );
};

export default Notes;
