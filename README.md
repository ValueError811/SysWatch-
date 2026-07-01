<div align="center">

<img src="assets/logo.png" alt="SysWatch Logo" width="220"/>

# SysWatch

### Lightweight Linux System Monitoring Dashboard

**Monitor your Linux system in real time through a modern web dashboard powered by Flask.**

Built by reading directly from the Linux **`/proc`** and **`/sys`** virtual filesystems — **without relying on `psutil`**.

<br>

![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask)
![Linux](https://img.shields.io/badge/Linux-Native-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)

</div>

---

<p align="center">
  <img src="assets/dashboard.png" alt="SysWatch Dashboard">
</p>

<p align="center">
  <em>A modern Linux system monitoring dashboard providing live CPU, memory, disk, network, and process statistics.</em>
</p>
<p align="center">
## 📖 About

**SysWatch** is a lightweight web-based Linux system monitoring dashboard designed to provide real-time insights into system performance through an intuitive and responsive interface. The project was built to explore how Linux exposes system information through its virtual filesystems while creating a practical monitoring tool from the ground up.

Unlike many system monitoring applications that rely on high-level libraries such as **`psutil`**, SysWatch reads system metrics directly from the Linux **`/proc`** and **`/sys`** virtual filesystems. This approach provides a deeper understanding of Linux internals and demonstrates how the operating system exposes information about the CPU, memory, storage, network interfaces, running processes, and other system resources.

The backend is built with **Flask** and follows a modular architecture where dedicated Python modules collect different categories of system metrics. These metrics are aggregated through a central manager and exposed via a REST API. The frontend periodically retrieves this data using JavaScript's Fetch API and visualizes it through interactive charts, system cards, and a live process table.

SysWatch was developed as a systems programming project to strengthen my understanding of Linux internals, backend development, and full-stack application design while building a practical tool that showcases direct interaction with the operating system.
</p>

---

<p align="center>
## ✨ Features

- 🖥️ **System Overview**
  - Displays hostname, operating system, kernel version, uptime, and system status.

- ⚡ **CPU Monitoring**
  - Tracks live CPU utilization along with the number of physical cores and logical threads.

- 🧠 **Memory Monitoring**
  - Displays memory usage with detailed statistics and interactive visualizations.

- 💾 **Disk Monitoring**
  - Reports disk usage, available storage, and utilization percentage.

- 🌐 **Network Monitoring**
  - Monitors real-time upload and download speeds across network interfaces.

- 📈 **Interactive Charts**
  - Visualizes CPU, memory, disk, and network activity using dynamic Chart.js graphs.

- 🔍 **Process Explorer**
  - Lists running processes with PID, CPU usage, memory consumption, and process state.

- 🔄 **Live Updates**
  - Continuously refreshes system metrics through asynchronous API requests without requiring page reloads.

- 🐧 **Linux Native**
  - Collects data directly from the Linux **`/proc`** and **`/sys`** virtual filesystems without relying on external monitoring libraries.
  </p>
  ---
  ## 🏗️ Architecture

<p align="center">
    <img src="assets/architecture.png" alt="SysWatch Architecture" width="95%">
</p>

SysWatch follows a modular client-server architecture where the frontend communicates with a Flask backend to retrieve live system metrics. The backend gathers data through dedicated metric collection modules that read directly from the Linux **`/proc`** and **`/sys`** virtual filesystems.

### Data Flow

1. The browser loads the dashboard and periodically requests updated system information.
2. Flask exposes REST API endpoints that serve the latest system metrics.
3. The central `manager.py` coordinates all metric collection modules.
4. Individual modules gather CPU, memory, disk, network, process, and system information directly from the Linux kernel interfaces.
5. The collected data is returned as JSON and rendered dynamically using JavaScript and Chart.js.