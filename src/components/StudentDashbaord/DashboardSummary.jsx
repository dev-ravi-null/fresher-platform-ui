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
import { useSelector } from "react-redux";

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

const DashboardSummary = () => {
  // Accessing fresher details from Redux state
  const fresherDetails = useSelector((state) => state.fresherDetails?.data?.data);
  debugger
  const profileSummary = fresherDetails?.profileSummary || []; // Extract profileSummary from fresherDetails
  const createdAt = new Date(fresherDetails?.fresherDetails?.createdAt);

  // Get the months array for the table
  const months = [];
  const date = new Date(createdAt); // Single date variable

  for (let i = 0; i < 5; i++) {
    let month = new Date(createdAt);
    month.setMonth(month.getMonth() + i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Monthly Progress <br />
        <p>Joining Date: {date.toISOString().split("T")[0]}</p>
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Month</StyledTableCell>
              <StyledTableCell align="center">Commits</StyledTableCell>
              <StyledTableCell align="center">Interviews</StyledTableCell>
              <StyledTableCell align="center">Progress</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {months.map((month, index) => {
              const createdAtDate = new Date(createdAt);
              createdAtDate.setMonth(createdAtDate.getMonth() + index);
              const daysSinceCreation = (new Date() - createdAtDate) / (1000 * 60 * 60 * 24);
              const isDisabled = daysSinceCreation < 28;

              // Extract the profile data for this month
              const monthData = profileSummary[index] || {};
              const commits = monthData.commits || 0;
              const interview = monthData.interview || "Not Yet";
              const progress = monthData.progress || 0;
              const action = monthData.action || "False";

              return (
                <StyledTableRow key={month} align="center">
                  <StyledTableCell component="th" scope="row" align="center">
                    {month}
                  </StyledTableCell>
                  <StyledTableCell align="center">{commits}</StyledTableCell>
                  <StyledTableCell align="center">{interview}</StyledTableCell>
                  <StyledTableCell align="center">{progress}%</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" color="primary" size="small" disabled={isDisabled || action === "False"}>
                      Request Interview
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardSummary;
