// Placeholder function to simulate fetching data from the API
function fetchData() {
    fetch('http://172.31.43.59:5000/fetchCryptoData') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.name); // Replace with actual crypto names
            const prices = data.map(item => item.price); // Replace with actual price data

            updateChart(labels, prices);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to create/update the chart
function updateChart(labels, data) {
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Crypto Prices',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const chartContainer = document.getElementById('chart-container');
    const chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.offsetWidth,
        height: 500,
    });

    const lineSeries = chart.addLineSeries();

    // Example data, replace this with actual crypto data from your S3 or EC2
    lineSeries.setData([
        { time: '2024-10-01', value: 45000 },
        { time: '2024-10-02', value: 45500 },
        { time: '2024-10-03', value: 46000 },
        { time: '2024-10-04', value: 47000 },
        { time: '2024-10-05', value: 48000 },
    ]);
});

// Fetch data when the page loads
// Replace this URL with your actual S3 file URL
fetch('https://coinank-bucket.s3.eu-north-1.amazonaws.com/crypto_data.jason')
    .then(response => response.json())
    .then(data => {
        const formattedData = data.map(item => ({
            time: item.timestamp, // Adjust depending on how the data is structured
            value: item.price,
        }));
        lineSeries.setData(formattedData);
    })
    .catch(error => console.error('Error fetching crypto data:', error));
