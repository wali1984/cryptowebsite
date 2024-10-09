// Placeholder function to simulate fetching data from the API
function fetchData() {
    fetch('https://your-api-url.com/fetchCryptoData') // Replace with your API URL
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

// Fetch data when the page loads
fetchData();
