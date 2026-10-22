# -*- coding: utf-8 -*-
"""Round 2: .com via Verisign RDAP; .cn via CNNIC whois (port 43)."""
import socket
import urllib.request
import urllib.error

COM = [
    "mtubeijian", "chaiyoujipeijian", "mtukuaixiu", "mtuzhuanpei",
    "mtupeijian", "mtupart", "mtuspares", "dieselmtu",
]


def rdap(domain):
    url = "https://rdap.verisign.com/com/v1/domain/" + domain
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # noqa: BLE001
        return "ERR:" + type(e).__name__


def cnnic_whois(domain):
    try:
        s = socket.create_connection(("whois.cnnic.cn", 43), timeout=15)
        s.sendall((domain + "\r\n").encode())
        chunks = []
        while True:
            buf = s.recv(4096)
            if not buf:
                break
            chunks.append(buf)
        s.close()
        return b"".join(chunks).decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        return "ERR:" + type(e).__name__ + ":" + str(e)


print("=== .com (404 = available) ===")
for name in COM:
    d = name + ".com"
    print(f"{rdap(d):>5}  {d}")

print()
print("=== .cn (CNNIC whois) ===")
for d in ["mtupeijian.cn", "mtuparts.cn", "mtupart.cn", "mtubeijian.cn"]:
    raw = cnnic_whois(d)
    low = raw.lower()
    if raw.startswith("ERR:"):
        verdict = raw
    elif "no matching object" in low or "not found" in low:
        verdict = "AVAILABLE (no matching object)"
    elif "domain name:" in low or "registrant" in low:
        verdict = "REGISTERED"
    else:
        verdict = "UNKNOWN"
    print(f"{d:<18} {verdict}")
