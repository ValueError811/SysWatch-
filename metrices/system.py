import socket

def get_hostname():
    return socket.gethostname()
import platform

def get_kernel_version():
    return platform.release()
def get_distribution():
    with open("/etc/os-release", "r") as file:
        for line in file:
            if line.startswith("PRETTY_NAME="):
                return line.split("=")[1].strip().strip('"')
def get_uptime():
    with open("/proc/uptime", "r") as file:
        uptime_seconds = float(file.read().split()[0])

    hours = int(uptime_seconds // 3600)
    minutes = int((uptime_seconds % 3600) // 60)

    return f"{hours}h {minutes}m"
