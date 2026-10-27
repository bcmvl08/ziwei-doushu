#!/usr/bin/env python3
"""Restore zh-TW files from gzip+base64 payloads under .cursor-sync/payloads/."""
import base64, gzip, hashlib, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAYLOAD_DIR = ROOT / ".cursor-sync" / "payloads"
MANIFEST = PAYLOAD_DIR / "manifest.json"

def restore_one(path: str, meta: dict) -> None:
    parts = meta["payloads"] if "payloads" in meta else [meta["payload"]]
    missing = [p for p in parts if not (PAYLOAD_DIR / p).exists()]
    if missing:
        raise FileNotFoundError(f"missing payloads: {missing}")
    b64 = "".join(
        "".join((PAYLOAD_DIR / p).read_text().split())
        for p in parts
    )
    raw = gzip.decompress(base64.b64decode(b64))
    h = hashlib.sha256(raw).hexdigest()
    if h != meta["sha256"]:
        raise ValueError(f"HASH MISMATCH: got {h} expected {meta['sha256']}")
    out = ROOT / path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(raw)
    print(f"restored {path} ({len(raw)} bytes)")

def main():
    manifest = json.loads(MANIFEST.read_text())
    errors = []
    for path, meta in manifest.items():
        try:
            restore_one(path, meta)
        except Exception as e:
            print(f"SKIP {path}: {e}", file=sys.stderr)
            errors.append(path)
    if errors:
        print(f"incomplete: {errors}", file=sys.stderr)
        # succeed if at least one file restored; fail only if all failed
        restored = [p for p in manifest if p not in errors]
        if not restored:
            sys.exit(1)
        print(f"partial OK: restored {restored}")
    else:
        print("OK")

if __name__ == "__main__":
    main()
