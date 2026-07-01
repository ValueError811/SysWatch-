def get_network_info():
    with open("/proc/net/dev") as file:
        next(file)
        next(file)
        total_receive = 0
        total_transmit = 0
        for line in file:
            parts = line.split()
            interface = parts[0].rstrip(":")
            if interface == "lo":
                continue

            receive = int(parts[1])
            transmit = int(parts[9])

            if receive == 0 and transmit == 0:
                continue

            total_receive += receive
            total_transmit += transmit

        return total_receive,total_transmit
            
            