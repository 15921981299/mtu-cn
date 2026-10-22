# -*- coding: utf-8 -*-
"""Probe candidate domains: .com via Verisign RDAP, .cn/.com.cn via DNS + rdap.org."""
import socket
import urllib.request
import urllib.error

COM = [
    "mtupeijian", "mtuparts", "mtupart", "mtuspares", "mtudiesel",
    "chinamtu", "mtuchina", "mtuzhuanpei", "mtupeijianwang", "mtuoem",
    "mtukits", "dieselmtu", "mtufilter", "mtupartspro", "mtupeijiancn",
]

CN = [
    "mtupeijian", "mtuparts", "mtupart", "mtuspares", "chinamtu",
    "mtuchina", "mtuzhuanpei", "dieselmtu",
]


def rdap(domain, base):
    url = f"{base}/{domain}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # noqa: BLE001
        return "ERR:" + type(e).__name__


def resolves(domain):
    try:
        socket.getaddrinfo(domain, None)
        return True
    except Exception:  # noqa: BLE001
        return False


print("=== .com (Verisign RDAP: 404 = not registered, 200 = taken) ===")
for name in COM:
    d = name + ".com"
    print(f"{rdap(d, 'https://rdap.verisign.com/com/v1/domain'):>5}  {d}")

print()
print("=== .cn / .com.cn (DNS resolve = likely in use) ===")
for name in CN:
    for suffix in (".cn", ".com.cn"):
        d = name + suffix
        code = rdap(d, "https://rdap.org/domain")
        print(f"{str(code):>8}  {'RESOLVES' if resolves(d) else 'no-dns':>9}  {d}")
