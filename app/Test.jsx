"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TestSummaryReport = ({ employeeData }) => {
  const [chartData, setChartData] = useState([]);

  const chartRef = useRef(null);

  useEffect(() => {
    const answerValues = ['strongly disagree', 'disagree', 'neutral', 'agree', 'strongly agree'];

    const answerCounts = Array.from({ length: 10 }, () => Array.from({ length: 5 }, () => 0));

    employeeData.forEach((employee) => {
      employee.forEach((answer, questionIndex) => {
        const answerIndex = answerValues.indexOf(answer);
        answerCounts[questionIndex][answerIndex]++;
      });
    });

    setChartData(answerCounts);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('testSummaryChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      
      data: {
        labels: Array.from({ length: 10 }, (_, i) => `Question ${i + 1}`),
        datasets: answerValues.map((answer, answerIndex) => ({
          label: answer,
          data: answerCounts.map((counts) => counts[answerIndex]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }))
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [employeeData]);

  return (
    <div className='w-[1200px] h-[500px] mx-auto'>
      <h2>Employee Feedback Summary</h2>
      <canvas id="testSummaryChart" width="200" height="200"></canvas>
    </div>
  );
};

export default TestSummaryReport;