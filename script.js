const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Bitcoin', 'Ethereum', 'Cardano'],
    datasets: [
      {
        label: 'Price in USD',
        data: [],
        backgroundColor: '#2f8ea3',
      },
    ],
  },
});

const token =
  'a5e69ea677b418dab9c40723d9a9f0103b9737c071fce7ae037cb7bb81abb840';
const apiUrl = 'https://rest.coincap.io/v3/price/bysymbol/BTC%2CETH%2CADA';


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
  } catch (err) {
    console.error(err);
  }
}
updateChartData();

