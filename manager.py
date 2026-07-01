from metrices.cpu import cpu
from metrices.memory import memory
from metrices.system import *
from metrices.disk import disk
from metrices.network import get_network_info
from metrices.processes import get_processes

import time


def get_system_snapshot():

    download_before, upload_before = get_network_info()

    time.sleep(1)

    download_after, upload_after = get_network_info()

    return {

        "system": {

            "hostname": get_hostname(),
            "kernel": get_kernel_version(),
            "distribution": get_distribution(),
            "uptime": get_uptime(),

        },

        # cpu() now returns a dictionary
        "cpu": cpu(),

        "memory": {

            "total": memory("MemTotal:"),
            "free": memory("MemFree:"),
            "available": memory("MemAvailable:"),
            "buffers": memory("Buffers:"),
            "cached": memory("Cached:"),

        },

        "disk": {

            "total": disk("f_blocks"),
            "free": disk("f_bavail"),
            "used": round(
                disk("f_blocks") - disk("f_bavail"),
                2
            ),

            "usage": round(

                (
                    (disk("f_blocks") - disk("f_bavail"))
                    / disk("f_blocks")
                ) * 100,

                2,

            ),

        },

        "network": {

            "download": round(

                (download_after - download_before)
                / (1024 * 1024),

                4,

            ),

            "upload": round(

                (upload_after - upload_before)
                / (1024 * 1024),

                4,

            ),

        },

        "processes": get_processes(),

    }