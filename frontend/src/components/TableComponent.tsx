import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChipComponent from "./ChipComponent"; // Make sure this component exists
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Popover, TableSortLabel, Button, Paper } from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

// Helper function to sort data
const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order: "asc" | "desc", orderBy: string) => {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array: any[], comparator: any) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

interface TableComponentProps {
  tableHeadData: string[];
  tableBodyData: Array<{ [key: string]: string | number }>;
  popoverContent: React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableHeadData,
  tableBodyData,
  popoverContent,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>(""); // Store column to sort by
  const [maxRows, setMaxRows] = React.useState<number>(7); // Rows that fit the screen

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Show popover
  };

  const handleClose = () => {
    setAnchorEl(null); // Close popover
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property); // Set column to sort by
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy(""); // Reset sorting
  };

  const calculateMaxRows = () => {
    const rowHeight = 48; // Height of each row in pixels
    const containerPadding = 150; // Padding for header, footer, etc.
    const availableHeight = window.innerHeight - containerPadding;
    setMaxRows(Math.floor(availableHeight / rowHeight)); // Calculate rows that fit
  };

  React.useEffect(() => {
    calculateMaxRows(); // Initial calculation
    window.addEventListener("resize", calculateMaxRows);
    return () => {
      window.removeEventListener("resize", calculateMaxRows); // Clean up on unmount
    };
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const sortedData = stableSort(tableBodyData, getComparator(order, orderBy));
  const displayedData = sortedData.slice(0, maxRows); // Display rows within the limit

  const handleRowClick = (row: { [key: string]: string | number }) => {
    console.log("Row clicked:", row); // Handle row click logic
  };

  return (
    <TableContainer
      sx={{
        "&::-webkit-scrollbar": {
          width: 4,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#D9D9D9",
          "&:hover": {
            backgroundColor: "#909090",
          },
        },
      }}
      className="bg-white rounded-lg max-h-[78vh]"
    >
      <Table stickyHeader aria-label="dynamic table">
        <TableHead className="bg-[#DCE5F6]">
          <TableRow>
            {tableHeadData.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#0F2043",
                  fontSize: "0.875rem",
                  backgroundColor: "#DCE5F6",
                }}
                sortDirection={orderBy === header ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleRequestSort(header)}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#0F2043",
                fontSize: "0.875rem",
                backgroundColor: "#DCE5F6",
              }}
            >
              {orderBy && (
                <IconButton onClick={handleResetSort} size="small">
                  <RestartAltOutlinedIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              onClick={() => handleRowClick(row)}
              style={{ cursor: "pointer" }}
            >
              {tableHeadData.map((header, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align="center"
                  sx={{
                    maxWidth: 150,
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {header === "Status" && typeof row[header] === "string" ? (
                    <ChipComponent label={row[header] as string} />
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}

              <TableCell align="right" width={5}>
                <IconButton aria-label="more-options" onClick={handleClick}>
                  <MoreIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {popoverContent}
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
