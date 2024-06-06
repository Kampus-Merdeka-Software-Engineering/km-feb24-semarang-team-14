// let myChart;
// window.addEventListener('resize', () => {
//     if (myChart) {
//         myChart.resize();
//     }
// });

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('dataset/superstore.json')
//         .then(response => response.json())
//         .then(data => {
//             // Prepare data
//             const aggregatedData = {};

//             // Aggregate data by month and year
//             data.forEach(item => {
//                 const dateKey = `${item.Year_Order_Data}-${String(item.Month_Order_Data).padStart(2, '0')}`;
//                 if (!aggregatedData[dateKey]) {
//                     aggregatedData[dateKey] = { sales: 0, profit: 0 };
//                 }
//                 aggregatedData[dateKey].sales += parseFloat(item.Sales);
//                 aggregatedData[dateKey].profit += parseFloat(item.Profit);
//             });

//             const dates = Object.keys(aggregatedData).sort((a, b) => new Date(a) - new Date(b));
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             const formattedDates = dates.map(date => {
//                 const [year, month] = date.split('-');
//                 return `${monthNames[parseInt(month) - 1]} ${year}`;
//             });
//             const sales = dates.map(date => aggregatedData[date].sales);
//             const profit = dates.map(date => aggregatedData[date].profit);

//             // Create the chart
//             const ctx_line = document.getElementById('lineChart').getContext('2d');
//             const lineChart = new Chart(ctx_line, {
//                 type: 'line',
//                 options: {
//                     animation: true,
//                     plugins: {
//                       legend: {
//                         display: true
//                       },
//                       tooltip: {
//                         enabled: true
//                       }
//                     }
//                   },
//                 data: {
//                     labels: formattedDates,
//                     datasets: [
//                         {
//                             label: 'Sales',
//                             data: sales,
//                             borderColor: 'rgba(255, 99, 132, 1)',
//                             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                             borderWidth: 2,
//                             pointRadius: 0
//                         },
//                         {
//                             label: 'Profit',
//                             data: profit,
//                             borderColor: 'rgba(54, 162, 235, 1)',
//                             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                             borderWidth: 2,
//                             pointRadius: 0
//                         }
//                     ]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Date'
//                             },
//                             grid: {
//                                 display: false
//                             },
//                             ticks: {
//                                 minRotation: 0, 
//                                 maxRotation: 0  
//                               }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Value'
//                             },
//                             beginAtZero: true,
//                             grid: {
//                                 display: false
//                             }
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'top',
//                         },
//                     }
//                 }
//             });



//             // SEGMENT CHART 
//             const segmentProfit = {};

//             data.forEach(item => {
//                 const segment = item.Segment;
//                 const profit = parseFloat(item.Profit);

//                 if (segmentProfit[segment]) {
//                     segmentProfit[segment] += profit;
//                 } else {
//                     segmentProfit[segment] = profit;
//                 }
//             });
//             // Convert the segmentProfit object to an array of [segment, profit] pairs
//             const sortedSegments = Object.entries(segmentProfit).sort((a, b) => a[1] - b[1]);

//             // Extract the sorted labels and profits
//             const labels_segments = sortedSegments.map(entry => entry[0]);
//             const profits_segments = sortedSegments.map(entry => entry[1]);

//             const ctx_segments = document.getElementById('barChartSegment').getContext('2d');
//             const barChartSegment = new Chart(ctx_segments, {
//                 type: 'bar',
//                 data: {
//                     labels: labels_segments,
//                     datasets: [{
//                         label: 'Profit',
//                         data: profits_segments,
//                         backgroundColor: '#606CC4',
//                     }]
//                 },
//                 options: {
//                     plugins: {
//                         datalabels: {
//                             anchor: 'end',
//                             align: 'top',
//                             formatter: function(value, context) {
//                                 return value.toLocaleString('id-ID') + ' rb';
//                             },
//                             font: {
//                                 weight: 'bold'
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });



//             // CATEGORY CHART
//             const categoryProfit = {};

//             data.forEach(item => {
//                 const category = item.Category;
//                 const profit = parseFloat(item.Profit);

//                 if (categoryProfit[category]) {
//                     categoryProfit[category] += profit;
//                 } else {
//                     categoryProfit[category] = profit;
//                 }
//             });

//             // Convert the segmentProfit object to an array of [segment, profit] pairs
//             const sortedCategory = Object.entries(categoryProfit).sort((a, b) => a[1] - b[1]);

//             // Extract the sorted labels and profits
//             const labels_category = sortedCategory.map(entry => entry[0]);
//             const profits_category = sortedCategory.map(entry => entry[1]);

//             const ctx_category = document.getElementById('barChartCategory').getContext('2d');
//             const barChartCategory = new Chart(ctx_category, {
//                 type: 'bar',
//                 data: {
//                     labels: labels_category,
//                     datasets: [{
//                         label: 'Profit',
//                         data: profits_category,
//                         backgroundColor: '#606CC4',
//                     }]
//                 },
//                 options: {
//                     plugins: {
//                         datalabels: {
//                             anchor: 'end',
//                             align: 'top',
//                             formatter: function(value, context) {
//                                 return value.toLocaleString('id-ID') + ' rb';
//                             },
//                             font: {
//                                 weight: 'bold'
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });

//         })
//         .catch(error => console.error('Error fetching the data:', error));
// });

// document.addEventListener('DOMContentLoaded', () => {
//     // Function to fetch and process the data
//     async function fetchData() {
//       const response = await fetch('dataset/superstore.json');
//       const data = await response.json();
      
//       // Process the data to get total profit by state
//       const profitByState = data.reduce((acc, order) => {
//         const state = order.State;
//         const profit = parseFloat(order.Profit);
        
//         if (!acc[state]) {
//           acc[state] = 0;
//         }
//         acc[state] += profit;
//         return acc;
//       }, {});
      
//       // Convert the profit data to the format required by the chart
//       const chartData = Object.keys(profitByState).map(state => ({
//         feature: state,
//         value: profitByState[state]
//       }));
  
//       return chartData;
//     }
  
//     // Function to render the Geo Chart Choropleth
//     async function renderChart() {
//       const ctx = document.getElementById('geoChart').getContext('2d');
//       const chartData = await fetchData();
      
//       const mapData = await fetch('https://unpkg.com/us-atlas/states-10m.json').then(res => res.json());
  
//       const map = ChartGeo.topojson.feature(mapData, mapData.objects.states).features;
  
//       new Chart(ctx, {
//         type: 'choropleth',
//         data: {
//           labels: map.map(d => d.properties.name),
//           datasets: [{
//             label: 'Profit by State',
//             data: chartData.map(d => ({
//               feature: map.find(f => f.properties.name === d.feature),
//               value: d.value
//             }))
//           }]
//         },
//         options: {
//           scale: {
//             projection: 'albersUsa'
//           },
//         }
//       });
//     }
//     renderChart();
//   });






// // KODE MORE EFFECTIVE
// let myChart;
// window.addEventListener('resize', () => {
//     if (myChart) {
//         myChart.resize();
//     }
// });

// document.addEventListener('DOMContentLoaded', function () {
//     fetch('dataset/superstore.json')
//         .then(response => response.json())
//         .then(data => {
//             // Prepare and aggregate data by month and year
//             const aggregatedData = {};
//             const segmentProfit = {};
//             const categoryProfit = {};

//             data.forEach(item => {
//                 const dateKey = `${item.Year_Order_Data}-${String(item.Month_Order_Data).padStart(2, '0')}`;
//                 if (!aggregatedData[dateKey]) {
//                     aggregatedData[dateKey] = { sales: 0, profit: 0 };
//                 }
//                 aggregatedData[dateKey].sales += parseFloat(item.Sales);
//                 aggregatedData[dateKey].profit += parseFloat(item.Profit);

//                 // Aggregate profit by segment
//                 const segment = item.Segment;
//                 segmentProfit[segment] = (segmentProfit[segment] || 0) + parseFloat(item.Profit);

//                 // Aggregate profit by category
//                 const category = item.Category;
//                 categoryProfit[category] = (categoryProfit[category] || 0) + parseFloat(item.Profit);
//             });

//             const dates = Object.keys(aggregatedData).sort((a, b) => new Date(a) - new Date(b));
//             const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             const formattedDates = dates.map(date => {
//                 const [year, month] = date.split('-');
//                 return `${monthNames[parseInt(month) - 1]} ${year}`;
//             });
//             const sales = dates.map(date => aggregatedData[date].sales);
//             const profit = dates.map(date => aggregatedData[date].profit);

//             // Create the line chart
//             const ctx_line = document.getElementById('lineChart').getContext('2d');
//             myChart = new Chart(ctx_line, {
//                 type: 'line',
//                 data: {
//                     labels: formattedDates,
//                     datasets: [
//                         {
//                             label: 'Sales',
//                             data: sales,
//                             borderColor: 'rgba(255, 99, 132, 1)',
//                             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                             borderWidth: 2,
//                             pointRadius: 0
//                         },
//                         {
//                             label: 'Profit',
//                             data: profit,
//                             borderColor: 'rgba(54, 162, 235, 1)',
//                             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                             borderWidth: 2,
//                             pointRadius: 0
//                         }
//                     ]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Date'
//                             },
//                             grid: {
//                                 display: false
//                             },
//                             ticks: {
//                                 minRotation: 0,
//                                 maxRotation: 0
//                             }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Value'
//                             },
//                             beginAtZero: true,
//                             grid: {
//                                 display: false
//                             }
//                         }
//                     },
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'top',
//                         },
//                         tooltip: {
//                             enabled: true
//                         }
//                     }
//                 }
//             });

//             // Create the segment profit bar chart
//             const sortedSegments = Object.entries(segmentProfit).sort((a, b) => a[1] - b[1]);
//             const labels_segments = sortedSegments.map(entry => entry[0]);
//             const profits_segments = sortedSegments.map(entry => entry[1]);

//             const ctx_segments = document.getElementById('barChartSegment').getContext('2d');
//             new Chart(ctx_segments, {
//                 type: 'bar',
//                 data: {
//                     labels: labels_segments,
//                     datasets: [{
//                         label: 'Profit',
//                         data: profits_segments,
//                         backgroundColor: '#606CC4',
//                     }]
//                 },
//                 options: {
//                     plugins: {
//                         datalabels: {
//                             anchor: 'end',
//                             align: 'top',
//                             formatter: function(value, context) {
//                                 return value.toLocaleString('id-ID') + ' rb';
//                             },
//                             font: {
//                                 weight: 'bold'
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });

//             // Create the category profit bar chart
//             const sortedCategory = Object.entries(categoryProfit).sort((a, b) => a[1] - b[1]);
//             const labels_category = sortedCategory.map(entry => entry[0]);
//             const profits_category = sortedCategory.map(entry => entry[1]);

//             const ctx_category = document.getElementById('barChartCategory').getContext('2d');
//             new Chart(ctx_category, {
//                 type: 'bar',
//                 data: {
//                     labels: labels_category,
//                     datasets: [{
//                         label: 'Profit',
//                         data: profits_category,
//                         backgroundColor: '#606CC4',
//                     }]
//                 },
//                 options: {
//                     plugins: {
//                         datalabels: {
//                             anchor: 'end',
//                             align: 'top',
//                             formatter: function(value, context) {
//                                 return value.toLocaleString('id-ID') + ' rb';
//                             },
//                             font: {
//                                 weight: 'bold'
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });

//             // Create the Geo Chart Choropleth
//             fetchData().then(chartData => {
//                 const ctx = document.getElementById('geoChart').getContext('2d');
//                 fetch('https://unpkg.com/us-atlas/states-10m.json')
//                     .then(res => res.json())
//                     .then(mapData => {
//                         const map = ChartGeo.topojson.feature(mapData, mapData.objects.states).features;
//                         new Chart(ctx, {
//                             type: 'choropleth',
//                             data: {
//                                 labels: map.map(d => d.properties.name),
//                                 datasets: [{
//                                     label: 'Profit by State',
//                                     data: chartData.map(d => ({
//                                         feature: map.find(f => f.properties.name === d.feature),
//                                         value: d.value
//                                     }))
//                                 }]
//                             },
//                             options: {
//                                 scale: {
//                                     projection: 'albersUsa'
//                                 }
//                             }
//                         });
//                     });
//             });

//         })
//         .catch(error => console.error('Error fetching the data:', error));

//     // Function to fetch and process the data for the Geo Chart Choropleth
//     async function fetchData() {
//         const response = await fetch('dataset/superstore.json');
//         const data = await response.json();

//         // Process the data to get total profit by state
//         const profitByState = data.reduce((acc, order) => {
//             const state = order.State;
//             const profit = parseFloat(order.Profit);

//             if (!acc[state]) {
//                 acc[state] = 0;
//             }
//             acc[state] += profit;
//             return acc;
//         }, {});

//         // Convert the profit data to the format required by the chart
//         return Object.keys(profitByState).map(state => ({
//             feature: state,
//             value: profitByState[state]
//         }));
//     }
// });





// KODE SUDAH FILTER TAPI IMPROVE

let myChart;
let lineChart, barChartSegment, barChartCategory, geoChart;

window.addEventListener('resize', () => {
    if (myChart) {
        myChart.resize();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('dataset/superstore.json')
        .then(response => response.json())
        .then(data => {
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
            const ctx_line = document.getElementById('lineChart').getContext('2d');
            const lineChart = new Chart(ctx_line, {
                type: 'line',
                options: {
                    animation: true,
                    plugins: {
                      legend: {
                        display: true
                      },
                      tooltip: {
                        enabled: true
                      }
                    }
                  },
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

            
            // FILTERING 

            const monthFilter = document.getElementById('month-filter');
            const stateFilter = document.getElementById('state-filter');
            // space
            // Populate month filter options
            const uniqueMonths = [...new Set(data.map(item => `${item.Year_Order_Data}-${String(item.Month_Order_Data).padStart(2, '0')}`))];
            uniqueMonths.sort((a, b) => new Date(a) - new Date(b)).forEach(month => {
                const option = document.createElement('option');
                option.value = month;
                option.text = month;
                monthFilter.appendChild(option);
            });
            // space
            // Populate state filter options
            const uniqueStates = [...new Set(data.map(item => item.State))].sort();
            uniqueStates.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.text = state;
                stateFilter.appendChild(option);
            });
            // space
            // Initial chart rendering
            renderCharts(data);
            // space
            // Event listeners for filters
            monthFilter.addEventListener('change', () => renderCharts(data));
            stateFilter.addEventListener('change', () => renderCharts(data));
        })
        .catch(error => console.error('Error fetching the data:', error));
});
// space
function renderCharts(data) {
    const monthFilter = document.getElementById('month-filter').value;
    const stateFilter = document.getElementById('state-filter').value;
    // space
    const filteredData = data.filter(item => {
        const itemMonth = `${item.Year_Order_Data}-${String(item.Month_Order_Data).padStart(2, '0')}`;
        return (monthFilter === "" || itemMonth === monthFilter) && (stateFilter === "" || item.State === stateFilter);
    });
    // space
    // Segment Chart
    const segmentProfit = {};
    filteredData.forEach(item => {
        const segment = item.Segment;
        const profit = parseFloat(item.Profit);
        segmentProfit[segment] = (segmentProfit[segment] || 0) + profit;
    });
    const sortedSegments = Object.entries(segmentProfit).sort((a, b) => a[1] - b[1]);
    const labels_segments = sortedSegments.map(entry => entry[0]);
    const profits_segments = sortedSegments.map(entry => entry[1]);
    // space
    const ctx_segments = document.getElementById('barChartSegment').getContext('2d');
    if (barChartSegment) barChartSegment.destroy();
    barChartSegment = new Chart(ctx_segments, {
        type: 'bar',
        data: {
            labels: labels_segments,
            datasets: [{
                label: 'Profit',
                data: profits_segments,
                backgroundColor: '#606CC4',
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function(value) {
                        return value.toLocaleString('id-ID') + ' rb';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // space
    // Category Chart
    const categoryProfit = {};
    filteredData.forEach(item => {
        const category = item.Category;
        const profit = parseFloat(item.Profit);
        categoryProfit[category] = (categoryProfit[category] || 0) + profit;
    });
    const sortedCategory = Object.entries(categoryProfit).sort((a, b) => a[1] - b[1]);
    const labels_category = sortedCategory.map(entry => entry[0]);
    const profits_category = sortedCategory.map(entry => entry[1]);
    // space
    const ctx_category = document.getElementById('barChartCategory').getContext('2d');
    if (barChartCategory) barChartCategory.destroy();
    barChartCategory = new Chart(ctx_category, {
        type: 'bar',
        data: {
            labels: labels_category,
            datasets: [{
                label: 'Profit',
                data: profits_category,
                backgroundColor: '#606CC4',
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function(value) {
                        return value.toLocaleString('id-ID') + ' rb';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // space
    // Geo Chart
    const profitByState = filteredData.reduce((acc, order) => {
        const state = order.State;
        const profit = parseFloat(order.Profit);
        acc[state] = (acc[state] || 0) + profit;
        return acc;
    }, {});
    // space
    const chartData = Object.keys(profitByState).map(state => ({
        feature: state,
        value: profitByState[state]
    }));
    // space
    const ctx_geo = document.getElementById('geoChart').getContext('2d');
    if (geoChart) geoChart.destroy();
    fetch('https://unpkg.com/us-atlas/states-10m.json')
        .then(res => res.json())
        .then(mapData => {
            const map = ChartGeo.topojson.feature(mapData, mapData.objects.states).features;
            geoChart = new Chart(ctx_geo, {
                type: 'choropleth',
                data: {
                    labels: map.map(d => d.properties.name),
                    datasets: [{
                        label: 'Profit by State',
                        data: chartData.map(d => ({
                            feature: map.find(f => f.properties.name === d.feature),
                            value: d.value
                        }))
                    }]
                },
                options: {
                    scale: {
                        projection: 'albersUsa'
                    }
                }
            });
        });
}