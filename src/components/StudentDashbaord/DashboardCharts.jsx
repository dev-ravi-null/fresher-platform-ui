import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const DashboardCharts = () => {
    const fresherDetails = useSelector((state) => state.fresherDetails.data.data)?.profileSummary || []; // Handle potential undefined data
    const skillsDetails = useSelector((state) => state.fresherDetails.data.data)?.fresherDetails?.skills || []; // Handle potential undefined data

    const totalCommit = 400;
    const totalInterview = 5;
    const totalSkills = 20;

    const actualSkills = skillsDetails.length;
    let actualCommit = 0;
    let actualInterview = 0;

    for (const detail of fresherDetails) {
        actualCommit += detail.commits || 0;
        if (detail.interview !== 0) {
            actualInterview++;
        }
    }

    const pendingSkills = totalSkills - actualSkills;

    const commitsData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [actualCommit, totalCommit - actualCommit], // Calculate remaining commits
                backgroundColor: ['#4caf50', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    const interviewData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [actualInterview, totalInterview - actualInterview], // Calculate remaining interviews
                backgroundColor: ['#2196f3', '#ffc107'],
                borderWidth: 1,
            },
        ],
    };

    const skillsData = {
        labels: ['Skills Acquired', 'Remaining'],
        datasets: [
            {
                data: [actualSkills, pendingSkills],
                backgroundColor: ['#8e44ad', '#7CB9E8'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <h6 style={{ color: 'grey' }}>NOTE : 50 Commits and 1 interview should be complete in first month for listing your profile.</h6>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                <div>
                    <h3>Commits Progress</h3>
                    <Doughnut data={commitsData} />
                </div>
                <div>
                    <h3>Interview Preparation</h3>
                    <Pie data={interviewData} />
                </div>
                <div>
                    <h3>Skills Acquired</h3>
                    <Bar data={skillsData} options={chartOptions} />
                </div>
            </div>
        </>
    );
};

export default DashboardCharts;