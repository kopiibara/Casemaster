import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Popover, Paper } from "@mui/material";

interface TableComponentProps {
  tableHeadData: string[];
  tableBodyData: Array<{ [key: string]: any }>;
  popoverContent: (attachment: any) => React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableHeadData,
  tableBodyData,
  popoverContent,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedAttachment, setSelectedAttachment] = React.useState<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, attachment: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAttachment(attachment);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAttachment(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadData.map((header, index) => (
              <TableCell key={index} align="center">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableHeadData.map((header, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {header === "Actions" ? (
                    <IconButton onClick={(event) => handleClick(event, row[header])}>
                      <MoreIcon />
                    </IconButton>
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {selectedAttachment && popoverContent(selectedAttachment)}
      </Popover>
    </TableContainer>
  );
};

export default TableComponent;
