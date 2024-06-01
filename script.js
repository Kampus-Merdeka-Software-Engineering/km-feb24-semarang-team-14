let myChart;
window.addEventListener('resize', () => {
    if (myChart) {
        myChart.resize();
    }
});

document.addEventListener('DOMContentLoaded', function () {
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



            // SEGMENT CHART 
            const segmentProfit = {};

            data.forEach(item => {
                const segment = item.Segment;
                const profit = parseFloat(item.Profit);

                if (segmentProfit[segment]) {
                    segmentProfit[segment] += profit;
                } else {
                    segmentProfit[segment] = profit;
                }
            });
            // Convert the segmentProfit object to an array of [segment, profit] pairs
            const sortedSegments = Object.entries(segmentProfit).sort((a, b) => a[1] - b[1]);

            // Extract the sorted labels and profits
            const labels_segments = sortedSegments.map(entry => entry[0]);
            const profits_segments = sortedSegments.map(entry => entry[1]);

            const ctx_segments = document.getElementById('barChartSegment').getContext('2d');
            const barChartSegment = new Chart(ctx_segments, {
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
                            formatter: function(value, context) {
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



            // CATEGORY CHART
            const categoryProfit = {};

            data.forEach(item => {
                const category = item.Category;
                const profit = parseFloat(item.Profit);

                if (categoryProfit[category]) {
                    categoryProfit[category] += profit;
                } else {
                    categoryProfit[category] = profit;
                }
            });

            // Convert the segmentProfit object to an array of [segment, profit] pairs
            const sortedCategory = Object.entries(categoryProfit).sort((a, b) => a[1] - b[1]);

            // Extract the sorted labels and profits
            const labels_category = sortedCategory.map(entry => entry[0]);
            const profits_category = sortedCategory.map(entry => entry[1]);

            const ctx_category = document.getElementById('barChartCategory').getContext('2d');
            const barChartCategory = new Chart(ctx_category, {
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
                            formatter: function(value, context) {
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

        })
        .catch(error => console.error('Error fetching the data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and process the data
    async function fetchData() {
      const response = await fetch('dataset/superstore.json');
      const data = await response.json();
      
      // Process the data to get total profit by state
      const profitByState = data.reduce((acc, order) => {
        const state = order.State;
        const profit = parseFloat(order.Profit);
        
        if (!acc[state]) {
          acc[state] = 0;
        }
        acc[state] += profit;
        return acc;
      }, {});
      
      // Convert the profit data to the format required by the chart
      const chartData = Object.keys(profitByState).map(state => ({
        feature: state,
        value: profitByState[state]
      }));
  
      return chartData;
    }
  
    // Function to render the Geo Chart Choropleth
    async function renderChart() {
      const ctx = document.getElementById('geoChart').getContext('2d');
      const chartData = await fetchData();
      
      const mapData = await fetch('https://unpkg.com/us-atlas/states-10m.json').then(res => res.json());
  
      const map = ChartGeo.topojson.feature(mapData, mapData.objects.states).features;
  
      new Chart(ctx, {
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
          },
        }
      });
    }
    renderChart();
  });