console.log("JavaScript started");

//process data
const processTable = document.querySelector("#process-table tbody");

//processsearch data 
const processSearch = document.getElementById("process-search");

//cpuchart data
const cpuCanvas = document.getElementById("cpuChart");
const cpuChart = new Chart(cpuCanvas, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "CPU Usage",
            data: [],
        }]
    }
});

//memorychart data
const memoryCanvas = document.getElementById("memoryChart");
const percentagePlugin = {
    id: "percentagePlugin",

    afterDraw(chart) {

        const { ctx } = chart;

        const dataset = chart.data.datasets[0].data;

        const total = dataset.reduce((a, b) => a + b, 0);

        chart.getDatasetMeta(0).data.forEach((slice, index) => {

            const value = dataset[index];
            const percent = ((value / total) * 100).toFixed(1) + "%";

            const x = slice.tooltipPosition().x;
            const y = slice.tooltipPosition().y;

            ctx.save();
            ctx.fillStyle = "white";
            ctx.font = "bold 14px Poppins";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(percent, x, y);
            ctx.restore();

        });
    }
};
const memoryChart = new Chart(memoryCanvas, {
    type: "doughnut",
    plugins: [percentagePlugin],
    data: {
        labels: ["Used", "Cached", "Free"],

        datasets: [{
            data: [0, 0, 0],

            backgroundColor: [
                "#ef4444",   // red
                "#f59e0b",   // yellow
                "#22c55e"    // green
            ],

            borderWidth: 0
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "70%",

        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});

//diskchart data 
const diskCanvas = document.getElementById("diskChart");
const diskContext = diskCanvas.getContext("2d");
function drawDiskBar(usage) {

    diskContext.clearRect(0, 0, diskCanvas.width, diskCanvas.height);

    const x = 20;
    const y = 40;
    const width = diskCanvas.width - 40;
    const height = 30;

    // Background
    diskContext.fillStyle = "#2f3545";
    diskContext.fillRect(x, y, width, height);

    // Filled portion
    diskContext.fillStyle = "#3b82f6";
    diskContext.fillRect(x, y, width * (usage / 100), height);

    // Percentage text
    diskContext.fillStyle = "white";
    diskContext.font = "18px Poppins";
    diskContext.fillText(usage.toFixed(2) + "%", x, y + 60);
}

// networkGraph data 
const networkCanvas = document.getElementById("networkChart");

const networkChart = new Chart(networkCanvas, {
    type: "line",

    data: {
        labels: [],

        datasets: [
            {
                label: "Download",
                data: [],
                borderColor: "#3b82f6",
                tension: 0.3
            },
            {
                label: "Upload",
                data: [],
                borderColor: "#22c55e",
                tension: 0.3
            }
        ]
    }
});




async function updateDashBoard() {
 const response = await fetch("api/system");
 const data=await response.json();

 //system information 
 document.getElementById("hostname").textContent =data.system.hostname;
 document.getElementById("os-name").textContent =data.system.distribution;   
 document.getElementById("kernel-version").textContent =data.system.kernel;
 document.getElementById("uptime").textContent =data.system.uptime;

 //cpu card
 document.getElementById("cpu-percent").textContent =data.cpu.usage + "%";
 document.getElementById("cpu-cores").textContent =data.cpu.cores;
 document.getElementById("cpu-threads").textContent =data.cpu.threads;

 //memory card
 const usedMemory = data.memory.total - data.memory.available;
 const memoryPercent =(usedMemory / data.memory.total) * 100;
 document.getElementById("memory-percent").textContent =memoryPercent.toFixed(2) + "%";

document.getElementById("memory-used").textContent =usedMemory.toFixed(2) + " GB";

document.getElementById("memory-total").textContent =data.memory.total.toFixed(2) + " GB";

//disk card
// Disk Information

document.getElementById("disk-percent").textContent =data.disk.usage + "%";

document.getElementById("disk-used").textContent =data.disk.used.toFixed(2) + " GB";

document.getElementById("disk-total").textContent =data.disk.total.toFixed(2) + " GB";

//network card 
document.getElementById("upload-speed").textContent =data.network.upload.toFixed(6) + " MB/s";
document.getElementById("download-speed").textContent =data.network.download.toFixed(6) + " MB/s";

//cpu graph 

cpuChart.data.labels.push("");
cpuChart.data.datasets[0].data.push(data.cpu.usage);
if (cpuChart.data.labels.length > 30) {
    cpuChart.data.labels.shift();
    cpuChart.data.datasets[0].data.shift();
}
 cpuChart.update();

 //memoryGraph
const cachedMemory = data.memory.cached;
const freeMemory = data.memory.free;
memoryChart.data.datasets[0].data = [
    usedMemory,
    cachedMemory,
    freeMemory
];

memoryChart.update();

//diskGraph
drawDiskBar(data.disk.usage);

// network graph
networkChart.data.labels.push("");

networkChart.data.datasets[0].data.push(data.network.download);
networkChart.data.datasets[1].data.push(data.network.upload);

if (networkChart.data.labels.length > 30) {
    networkChart.data.labels.shift();
    networkChart.data.datasets[0].data.shift();
    networkChart.data.datasets[1].data.shift();
}
console.log(data);
networkChart.update();

//processTable 
processTable.innerHTML = "";
for (const process of data.processes) {
    const search = processSearch.value.trim();
    if (search !== "" && !process.pid.toString().includes(search)) {
    continue;
}
const row = document.createElement("tr");
row.innerHTML = `
    <td>${process.pid}</td>
    <td>${process.name}</td>
    <td>${process.cpu.toFixed(2)}</td>
    <td>${process.memory.toFixed(2)} MB</td>
    <td>${process.state}</td>
`;
processTable.appendChild(row);
}
}
updateDashBoard();

setInterval(updateDashBoard, 1000);