import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface Column {
  id: string;
  label: string;
  align?: "right" | "left" | "center";
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
}

// Styled TableCell to ensure text wrapping and appropriate layout
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  wordWrap: "break-word", // Allow words to break and wrap onto the next line
  whiteSpace: "normal", // Allow the text to wrap instead of staying on one line
  overflowWrap: "break-word", // Ensure long words break and wrap within the cell
  padding: "8px 16px", // Add padding to improve readability
  maxWidth: "70px", // Set a maximum width for cells that might have long text
}));

// Styled TableCell for header to make text bold
const StyledTableHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: "bold", // Make the header text bold
}));

const SystemLogsTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableHeaderCell
                key={column.id}
                align={column.align || "left"}
              >
                {column.label}
              </StyledTableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || "left"}>
                  {row[column.id]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SystemLogsTable;
