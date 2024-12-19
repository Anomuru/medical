import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartOptions
} from 'chart.js';

import cls from "./platformHomeStatistics.module.sass";


// Регистрация компонентов графиков
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const PlatformHomeStatistics = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Appointments',
                data: [25, 30, 75, 10, 40], // Данные для записанных пациентов
                borderColor: '#00CFE8', // Голубой цвет
                backgroundColor: 'rgba(0, 207, 232, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Walk in patients',
                data: [65, 40, 70, 40, 60], // Данные для пациентов без записи
                borderColor: '#000000', // Черный цвет
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistics - Last 6 Months',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 80, // Устанавливаем максимальное значение оси Y
            },
        },
    };

    return (
        <div style={{ width: '700px'}}>
            <h2>Statistics</h2>
            <Line data={data} options={options}/>
        </div>
    );
}
