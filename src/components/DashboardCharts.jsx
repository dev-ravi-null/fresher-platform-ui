import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const DashboardCharts = () => {
    const commitsData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['#4caf50', '#f44336'],
                borderWidth: 1,
            },
        ],
    };

    const interviewData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [70, 50],
                backgroundColor: ['#2196f3', '#ffc107'],
                borderWidth: 1,
            },
        ],
    };

    const skillsData = {
        labels: ['Skills Acquired', 'Remaining'],
        datasets: [
            {
                data: [40, 20],
                backgroundColor: ['#8e44ad', '#ecf0f1'],
                borderWidth: 1,
            },
        ],
    };

    const resumeData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [10, 40],
                backgroundColor: ['#e74c3c', '#2ecc71'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '60px' }}>
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
                <Bar
                    data={skillsData}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
            <div>
                <h3>Resume Progress</h3>
                <Line
                    data={resumeData}
                    options={{
                        tension: 0.4,
                        fill: true,
                    }}
                />
            </div>
        </div>
    );
};

export default DashboardCharts;
