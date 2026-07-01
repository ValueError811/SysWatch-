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
## 📖 About

**SysWatch** is a lightweight web-based Linux system monitoring dashboard designed to provide real-time insights into system performance through an intuitive and responsive interface. The project was built to explore how Linux exposes system information through its virtual filesystems while creating a practical monitoring tool from the ground up.

Unlike many system monitoring applications that rely on high-level libraries such as **`psutil`**, SysWatch reads system metrics directly from the Linux **`/proc`** and **`/sys`** virtual filesystems. This approach provides a deeper understanding of Linux internals and demonstrates how the operating system exposes information about the CPU, memory, storage, network interfaces, running processes, and other system resources.

The backend is built with **Flask** and follows a modular architecture where dedicated Python modules collect different categories of system metrics. These metrics are aggregated through a central manager and exposed via a REST API. The frontend periodically retrieves this data using JavaScript's Fetch API and visualizes it through interactive charts, system cards, and a live process table.

SysWatch was developed as a systems programming project to strengthen my understanding of Linux internals, backend development, and full-stack application design while building a practical tool that showcases direct interaction with the operating system.
<p align="center">
  <img src="assets/dashboard.png" alt="SysWatch Dashboard">
</p>

<p align="center">
  <em>A modern Linux system monitoring dashboard providing live CPU, memory, disk, network, and process statistics.</em>
</p>

---