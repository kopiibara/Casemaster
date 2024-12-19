import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Popover,
  TableSortLabel,
  Paper,
} from "@mui/material";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import ChipComponent from "./ChipComponent"; // Ensure this component exists

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (!orderBy || !a[orderBy] || !b[orderBy]) return 0;
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order: "asc" | "desc", orderBy: string) =>
  order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);

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
  onRowClick?: (row: any) => void; // Added onRowClick
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableHeadData,
  tableBodyData,
  popoverContent,
  onRowClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>(tableHeadData[0] || "");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const sortedData = orderBy
    ? stableSort(tableBodyData, getComparator(order, orderBy))
    : tableBodyData;

  const handleRowClick = (rowId: any) => {
    // Pass the row ID to the parent component to fetch case details
    onRowClick && onRowClick(rowId);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "vh", overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeadData.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sortDirection={orderBy === header ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleRequestSort(header)}
                  aria-label={`Sort by ${header}`}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="center">
              {orderBy && (
                <Tooltip title="Reset Sorting">
                  <IconButton onClick={handleResetSort} size="small">
                    <RestartAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              onClick={() => handleRowClick(row.id)}
              style={{ cursor: "pointer" }}
            >
              {tableHeadData.map((header, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {header === "Status" && typeof row[header] === "string" ? (
                    <ChipComponent label={row[header] as string} />
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}
              <TableCell align="right">
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
