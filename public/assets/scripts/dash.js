function plotarGraficoBarra(dados, total) {
    const barCtx = document.getElementById("barChart").getContext("2d");
    const barData = {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        values: dados
    };

    document.getElementById("total-reviews-label").innerHTML =
        `Total: ${total} reviews`;

    new Chart(barCtx, {
        type: "bar",
        data: {
            labels: barData.labels,
            datasets: [{
                data: barData.values,
                backgroundColor: "rgba(74, 158, 219, 0.25)",
                borderColor: "rgba(74, 158, 219, 0.6)",
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                y: {
                    ticks: { stepSize: 1 },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}

function plotarGraficoDonut(generos){
const donutCtx = document.getElementById("donutChart").getContext("2d");


new Chart(donutCtx, {
    type: "doughnut",
    data: {
        labels: generos.map(g => g.categoria),
        datasets: [{
            data: generos.map(g => g.total),
            backgroundColor: generos.map(g => g.cor),
            borderColor: "#161b22"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
    }
});
}
