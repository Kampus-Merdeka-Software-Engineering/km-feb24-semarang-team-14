document.addEventListener('DOMContentLoaded', function () {
    fetch('../../dataset/superstore.json')
        .then(response => response.json())
        .then(data => {
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

            // Convert the categoryProfit object to an array of [category, profit] pairs
            const sortedCategory = Object.entries(categoryProfit).sort((a, b) => a[1] - b[1]);

            // Extract the sorted labels and profits
            const labels = sortedCategory.map(entry => entry[0]);
            const profits = sortedCategory.map(entry => entry[1]);

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
