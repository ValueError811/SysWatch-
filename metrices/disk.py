
import os

def disk(field):
    disk = os.statvfs("/")
    return round(getattr(disk, field) * disk.f_bsize / (1024 * 1024 * 1024), 2)
