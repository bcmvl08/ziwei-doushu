#!/usr/bin/env python3
"""Restore zh-TW files from gzip+base64 payloads under .cursor-sync/payloads/."""
import base64, gzip, hashlib, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAYLOAD_DIR = ROOT / ".cursor-sync" / "payloads"
MANIFEST = PAYLOAD_DIR / "manifest.json"

def main():
    manifest = json.loads(MANIFEST.read_text())
    for path, meta in manifest.items():
        parts = meta["payloads"] if "payloads" in meta else [meta["payload"]]
        b64 = "".join(
            "".join((PAYLOAD_DIR / p).read_text().split())
            for p in parts
        )
        # Repair known single-byte MCP corruption in page payload part a (Tw688→Tw788)
        if path == "app/page.tsx":
            b64 = b64.replace("OZeTw688AScQUzA", "OZeTw788AScQUzA", 1)
        raw = gzip.decompress(base64.b64decode(b64))
        h = hashlib.sha256(raw).hexdigest()
        if h != meta["sha256"]:
            print(f"HASH MISMATCH {path}: got {h} expected {meta['sha256']}", file=sys.stderr)
            sys.exit(1)
        out = ROOT / path
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(raw)
        print(f"restored {path} ({len(raw)} bytes)")
    print("OK")

if __name__ == "__main__":
    main()
