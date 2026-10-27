#!/usr/bin/env python3
"""Restore package-lock.json from gzip+base64 payloads under .cursor-sync/payloads/."""
import base64, gzip, hashlib, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAYLOAD_DIR = ROOT / ".cursor-sync" / "payloads"
MANIFEST = PAYLOAD_DIR / "manifest.json"

def main():
    manifest = json.loads(MANIFEST.read_text())
    meta = manifest["package-lock.json"]
    parts = meta["payloads"]
    missing = [p for p in parts if not (PAYLOAD_DIR / p).exists()]
    if missing:
        raise SystemExit(f"missing payloads: {missing}")
    b64 = "".join("".join((PAYLOAD_DIR / p).read_text().split()) for p in parts)
    raw = gzip.decompress(base64.b64decode(b64))
    h = hashlib.sha256(raw).hexdigest()
    if h != meta["sha256"]:
        raise SystemExit(f"HASH MISMATCH: got {h} expected {meta['sha256']}")
    if b"opencc-js" in raw:
        raise SystemExit("opencc-js still present in restored lock")
    out = ROOT / "package-lock.json"
    out.write_bytes(raw)
    print(f"restored package-lock.json ({len(raw)} bytes, sha256={h})")

if __name__ == "__main__":
    main()
