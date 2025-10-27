const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Bitcoin', 'Ethereum', 'Cardano'],
    datasets: [
      {
        label: 'Prix',
        data: [],
        borderWidth: 3,
        minBarLength: 5,
        borderRadius: 20,
        borderColor: 'rgba(47, 142, 163, 1)',
        backgroundColor: 'rgba(47, 142, 163, 0.5)',
      },
    ],
    options: {
      indexAxis: 'y',
    },
  },
});

// Connect to the API
const token =
  'a5e69ea677b418dab9c40723d9a9f0103b9737c071fce7ae037cb7bb81abb840';
const apiUrl = 'https://rest.coincap.io/v3/price/bysymbol/BTC%2CETH%2CADA';

// Function to add data to the history table
function addToHistoryTable(data) {
  const historyTable = document.querySelector('.history-table');
  const newRow = document.createElement('tr');
  const dateCell = document.createElement('td');
  const dataCell = document.createElement('td');

  dateCell.textContent = new Date().toLocaleString();

  // Format the data as "Bitcoin: 114788.53, Ethereum: 4139.8, Cardano: 0.669278"
  const formattedData = data.labels
    .map((label, index) => `${label}: ${data.datasets[0].data[index]}`)
    .join(', ');
  dataCell.textContent = formattedData;

  newRow.appendChild(dateCell);
  newRow.appendChild(dataCell);

  historyTable.appendChild(newRow);
}

async function updateChartData() {
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const apiData = await res.json();

    console.log(apiData);

    const prices = Object.values(apiData.data).map((x) => parseFloat(x));
    chart.data.datasets[0].data = prices;

    console.log(prices);
    chart.update();

    // Add the updated data to the history table
    addToHistoryTable(chart.data);
  } catch (err) {
    console.error(err);
  }
}
updateChartData();

// Create and add the update button
const updateButton = document.createElement('button');
updateButton.textContent = 'Mettre à jour les données';
updateButton.classList.add('update-button');
document.getElementById('myChart').before(updateButton);

updateButton.addEventListener('click', async () => {
  updateButton.textContent = 'Mise à jour...';
  await updateChartData();
  setTimeout(() => {
    updateButton.textContent = 'Mettre à jour les données';
  }, 1000);
});

// Create the history table
const history = document.createElement('div');
history.classList.add('history');
const titleHistory = document.createElement('h2');
titleHistory.textContent = 'Historique des données';
const historyTable = document.createElement('table');
historyTable.classList.add('history-table');
const headerRow = document.createElement('tr');
const headers = ['Date', 'Données'];
headers.forEach((text) => {
  const th = document.createElement('th');
  th.textContent = text;
  headerRow.appendChild(th);
});
history.appendChild(titleHistory);
history.appendChild(historyTable);
historyTable.appendChild(headerRow);
document.body.appendChild(history);
