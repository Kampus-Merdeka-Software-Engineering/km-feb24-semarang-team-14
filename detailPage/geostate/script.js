document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and process the data
    async function fetchData() {
      const response = await fetch('../../dataset/superstore.json');
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
      const ctx = document.getElementById('myChart').getContext('2d');
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