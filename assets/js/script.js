const input = document.getElementById("monto");
const button = document.getElementById("convertButton");
const resultado = document.getElementById("resultado");
const select = document.getElementById("monedas");

let chartInstance = null;

const getMonedas = async () => {
    try {
        const url = encodeURIComponent("https://mindicador.cl/api/")
        const res = await fetch(`https://corsproxy.io/?${url}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        resultado.textContent = "Error al cargar API";
    }
};

function getDataToChart(moneda){
    const labels = [];
    for (let i = 9; i >= 0; i--){
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - i);

        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;

        labels.push(`${dia} - ${mes}`);
    }

    const data = moneda === "dolar" ? [930, 931, 929, 932, 930, 933, 931, 930, 932, 931] : [1070, 1071, 1069, 1072, 1070, 1073, 1071, 1070, 1072, 1071];
    const datasets = [
        {
            label: moneda,
            borderWidth: 2,
            data: data
        }
    ];
    return{labels, datasets};
}

function renderGrafica(moneda){
    const data = getDataToChart(moneda);
    const config = {
        type: "line",
        data: data
    };
    const myChart = document.getElementById("myChart");
    if(chartInstance){
        chartInstance.destroy();
    }
    chartInstance = new Chart(myChart, config);
}   

button.addEventListener("click", async () => {
    const monedas = await getMonedas();
    const monedaSeleccionada = select.value;
    const monto = input.value;
    console.log(monedaSeleccionada);
    console.log(monedas);
    if (monedaSeleccionada === "dolar") {
        resultado.textContent = (monto / monedas.dolar.valor).toFixed(2) + "USD";
    } else if (monedaSeleccionada === "euro") {
        resultado.textContent = (monto / monedas.euro.valor).toFixed(2) + "EUR";
    }
    renderGrafica(monedaSeleccionada);
    input.value = "";
    input.focus();
});









