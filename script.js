const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2023-03-19';
const canvas = document.querySelector('canvas');

async function getPrixBitcoin() {
    try {
        const reponse = await axios.get(url);
        const prixBitcoin = Object.values(reponse.data.bpi); // Les valeurs de prix
        const datesBitcoin = Object.keys(reponse.data.bpi); // Les dates comme labels

        const indexStart2023 = datesBitcoin.length - 100; // Commencer à partir des 100 derniers éléments
        const prix2023 = prixBitcoin.slice(indexStart2023);
        const dates2023 = datesBitcoin.slice(indexStart2023);

        // Création du graphique
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: dates2023,
                datasets: [{
                    label: 'Prix Bitcoin 2023',
                    data: prix2023,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    } catch (error) {
        console.error(error);
    }
}

getPrixBitcoin();
