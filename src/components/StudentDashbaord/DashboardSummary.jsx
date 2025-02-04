import React, { useState, useEffect } from "react";
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

const CountdownTimer = ({ joiningDate }) => {
  const joiningTimestamp = new Date(joiningDate).getTime();
  const targetTimestamp = joiningTimestamp + 28 * 24 * 60 * 60 * 1000; // 28 days added

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ textAlign: "center", p: 2, border: "2px solid #33f0ff", borderRadius: "8px", boxShadow: 2, minWidth: 180 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", }}>
      Eligible for Interview
      </Typography>
      <Typography variant="body1">
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </Typography>
    </Box>
  );
};

const DashboardSummary = () => {
  const fresherDetails = useSelector((state) => state.fresherDetails?.data?.data);
  const profileSummary = fresherDetails?.profileSummary || [];
  const createdAt = new Date(fresherDetails?.fresherDetails?.createdAt);

  const months = [];
  const date = new Date(createdAt);

  for (let i = 0; i < 5; i++) {
    let month = new Date(createdAt);
    month.setMonth(month.getMonth() + i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto", p: 2 }}>
      {/* Centered Header & Right Aligned Countdown */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", m:2, marginRight:1 }}>Monthly Progress</Typography>
          <Typography variant="subtitle1">
            Joining Date: <strong>{date.toISOString().split("T")[0]}</strong>
          </Typography>
        </Box>
        <CountdownTimer joiningDate={date.toISOString().split("T")[0]} />
      </Box>

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
