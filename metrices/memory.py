def memory(field):
    with open("/proc/meminfo") as file:
        for line in file:
            if line.startswith(field):
                return round(int(line.split()[1].strip())/(1024*1024),2)