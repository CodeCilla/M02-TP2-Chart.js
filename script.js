const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    datasets: [
      {
        label: 'Nombre de visiteurs',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#2f8ea3',
      },
    ],
  },
});

const token =
  'a5e69ea677b418dab9c40723d9a9f0103b9737c071fce7ae037cb7bb81abb840';
fetch('https://rest.coincap.io/v3/price/bysymbol/BTC%2CETH%2CADA', {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
