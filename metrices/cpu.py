import os
import time


def cpu():

    with open("/proc/stat") as file:
        first_line = file.readline().split()[1:]
        idle1 = int(first_line[3])

        activity1 = 0

        for value in first_line:
            activity1 += int(value)

    time.sleep(1)

    with open("/proc/stat") as file:
        second_line = file.readline().split()[1:]
        idle2 = int(second_line[3])

        activity2 = 0

        for value in second_line:
            activity2 += int(value)

    difference = activity2 - activity1
    idle_difference = idle2 - idle1
    busy_difference = difference - idle_difference

    usage = round((busy_difference / difference) * 100, 2)

    return {
        "usage": usage,
        "cores": os.cpu_count(),
        "threads": os.cpu_count()
    }
        

        
            