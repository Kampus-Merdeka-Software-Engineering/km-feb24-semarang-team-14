document.addEventListener('DOMContentLoaded', function () {
    fetch('../../dataset/superstore.json')
        .then(response => response.json())
        .then(data => {
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
            const labels = sortedSegments.map(entry => entry[0]);
            const profits = sortedSegments.map(entry => entry[1]);

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Profit',
                        data: profits,
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
        .catch(error => console.error('Error loading the JSON data:', error));
});
