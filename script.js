let myChart;
window.addEventListener('resize', () => {
    if (myChart) {
        myChart.resize();
    }
});

fetch('dataset/superstore.json')
    .then(response => response.json())
    .then(data => {
        // Prepare data
        const aggregatedData = {};

        // Aggregate data by month and year
        data.forEach(item => {
            const dateKey = `${item.Year_Order_Data}-${String(item.Month_Order_Data).padStart(2, '0')}`;
            if (!aggregatedData[dateKey]) {
                aggregatedData[dateKey] = { sales: 0, profit: 0 };
            }
            aggregatedData[dateKey].sales += parseFloat(item.Sales);
            aggregatedData[dateKey].profit += parseFloat(item.Profit);
        });

        const dates = Object.keys(aggregatedData).sort((a, b) => new Date(a) - new Date(b));
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedDates = dates.map(date => {
            const [year, month] = date.split('-');
            return `${monthNames[parseInt(month) - 1]} ${year}`;
        });
        const sales = dates.map(date => aggregatedData[date].sales);
        const profit = dates.map(date => aggregatedData[date].profit);

        // Create the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: formattedDates,
                datasets: [
                    {
                        label: 'Sales',
                        data: sales,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        pointRadius: 0
                    },
                    {
                        label: 'Profit',
                        data: profit,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 2,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            minRotation: 0, 
                            maxRotation: 0  
                          }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the data:', error));


// Fungsi untuk mengambil data dari super.json
// async function fetchData() {
//     const response = await fetch('dataset/superstore.json');
//     const data = await response.json();
//     return data;
// }

// // Fungsi untuk memformat tanggal ke format yang diinginkan
// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
// }

// // Memuat data dari super.json
// fetchData()
//     .then(data => {
//         // Memisahkan data penjualan dan keuntungan
//         const salesData = data.map(item => ({
//             x: formatDate(item.Order_Date),
//             y: parseFloat(item.Sales)
//         }));
//         const profitData = data.map(item => ({
//             x: formatDate(item.Order_Date),
//             y: parseFloat(item.Profit)
//         }));

//         // Konfigurasi chart
//         const chartData = {
//             datasets: [
//                 {
//                     label: 'Profit',
//                     data: profitData,
//                     borderColor: 'blue',
//                     fill: false
//                 },
//                 {
//                     label: 'Sales',
//                     data: salesData,
//                     borderColor: 'red',
//                     fill: false
//                 }
//             ]
//         };

//         // Membuat instance chart
//         const ctx = document.getElementById('myChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'line',
//             data: chartData,
//             options: {
//                 scales: {
//                     x: {
//                         type: 'time',
//                         time: {
//                             unit: 'month'
//                         }
//                     }
//                 }
//             }
//         });
//     })
//     .catch(error => console.error(error));