import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChipComponent from "./ChipComponent";
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Popover, TableSortLabel, Paper } from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

// Helper function to sort data
const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (!orderBy || !a[orderBy] || !b[orderBy]) {
    return 0; // Skip sorting if no valid orderBy field
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
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
  const [orderBy, setOrderBy] = React.useState<string>(tableHeadData[0] || "");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Sort the table body data based on the current sorting state
  const sortedData = orderBy
    ? stableSort(tableBodyData, getComparator(order, orderBy))
    : tableBodyData;

  return (
    <TableContainer
      sx={{
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
      className="bg-white rounded-lg max-h-[78vh]"
    >
      <Table
        className="h-full"
        size={orderBy ? "small" : "medium"}
        stickyHeader
        aria-label="dynamic table"
      >
        <TableHead className="bg-[#DCE5F6] [&_.MuiTableCell-head]:font-bold [&_.MuiTableCell-head]:text-[#0F2043] [&_.MuiTableCell-head]:text-sm">
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
        <TableBody
          sx={{
            "& .MuiTableCell-body": { color: "#0F2043", fontSize: "0.875rem" },
          }}
        >
          {sortedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                <IconButton
                  aria-label="more-options"
                  aria-describedby={id}
                  onClick={handleClick}
                >
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
                  slotProps={{
                    paper: {},
                  }}
                  sx={{
                    ".MuiPaper-root": {
                      maxWidth: "100%",
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "#DBDEE3",
                      borderRadius: 3,
                    },
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
