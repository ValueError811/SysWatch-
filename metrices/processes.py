import os
import time

def get_processes():
    states = {
        "R": "Running",
        "S": "Sleeping",
        "D": "Disk Sleep",
        "Z": "Zombie",
        "T": "Stopped",
        "I": "Idle",
    }

    processes = []

    with open("/proc/stat") as file:
        first_line = file.readline().split()[1:]

        system_total1 = 0

        for value in first_line:
            system_total1 += int(value)

    for entry in os.listdir("/proc"):
        if entry.isdigit():

            try:
                with open(f"/proc/{entry}/comm") as file:
                    name = file.read().strip()

                with open(f"/proc/{entry}/stat") as file:
                    parts = file.readline().split()
                    utime1 = int(parts[13])
                    stime1 = int(parts[14])

                with open(f"/proc/{entry}/status") as file:
                    state = "Unknown"
                    memory = 0

                    for line in file:
                        if line.startswith("State:"):
                            state = states.get(line.split()[1], "Unknown")
                        elif line.startswith("VmRSS:"):
                            memory = int(line.split()[1]) / 1024
                            break

                processes.append({
                    "pid": int(entry),
                    "name": name,
                    "state": state,
                    "memory": round(memory, 2),
                    "cpu_ticks": utime1 + stime1,
                    "cpu": 0,
                })

            except FileNotFoundError:
                continue

    time.sleep(1)

    with open("/proc/stat") as file:
        second_line = file.readline().split()[1:]

        system_total2 = 0

        for value in second_line:
            system_total2 += int(value)

    system_delta = system_total2 - system_total1

    for process in processes:
        pid = process["pid"]

        try:
            with open(f"/proc/{pid}/stat") as file:
                parts = file.readline().split()
                utime2 = int(parts[13])
                stime2 = int(parts[14])

            new_cpu_ticks = utime2 + stime2
            process_delta = new_cpu_ticks - process["cpu_ticks"]

            process["cpu"] = round((process_delta / system_delta) * 100, 6)
            del process["cpu_ticks"]

        except FileNotFoundError:
            continue
    processes.sort(key=lambda process: process["cpu"], reverse=True)

    return processes
    

        



            
