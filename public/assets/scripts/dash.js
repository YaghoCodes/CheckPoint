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
const donutCtx = document.getElementById("donutChart").getContext("2d");
const generos = [
    { label: "RPG", value: 10, color: "#3b82f6" },
    { label: "Indie", value: 8, color: "#6b7280" },
    { label: "Soulslike", value: 7, color: "#60a5fa" },
    { label: "Puzzle", value: 5, color: "#93c5fd" },
    { label: "Outros", value: 12, color: "#374151" },
];

new Chart(donutCtx, {
    type: "doughnut",
    data: {
        labels: generos.map(g => g.label),
        datasets: [{
            data: generos.map(g => g.value),
            backgroundColor: generos.map(g => g.color),
            borderColor: "#161b22"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
    }
});

