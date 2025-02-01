import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(month, commits, interviews, progress) {
  return { month, commits, interviews, progress };
}

const rows = [
  createData("January", 159, 2, "50%"),
  createData("February", 237, 3, "70%"),
  createData("March", 262, 1, "40%"),
  createData("April", 305, 4, "80%"),
  createData("May", 356, 5, "90%"),
];

export default function DashboardSummary() {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Monthly Progress Overview
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
          "@media (max-width: 600px)": {
            width: "100vw",
            overflowX: "scroll",
          },
        }}
      >
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell align="right">Commits</StyledTableCell>
              <StyledTableCell align="right">Interviews</StyledTableCell>
              <StyledTableCell align="right">Progress</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.month}>
                <StyledTableCell component="th" scope="row">
                  {row.month}
                </StyledTableCell>
                <StyledTableCell align="right">{row.commits}</StyledTableCell>
                <StyledTableCell align="right">{row.interviews}</StyledTableCell>
                <StyledTableCell align="right">{row.progress}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" color="primary" size="small">
                    Request Interview
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
