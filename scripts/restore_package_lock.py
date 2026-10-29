#!/usr/bin/env python3
"""Restore package-lock.json from gzip+base64 payloads."""
import base64, gzip, hashlib, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
PAYLOAD_DIR = ROOT / ".cursor-sync" / "payloads"
MANIFEST = PAYLOAD_DIR / "manifest.json"
FIXES = PAYLOAD_DIR / "fixes.json"

def main():
    manifest = json.loads(MANIFEST.read_text())
    meta = manifest["package-lock.json"]
    parts = []
    for name in meta["payloads"]:
        text = "".join((PAYLOAD_DIR / name).read_text().split())
        parts.append(list(text))
    if FIXES.exists():
        for fix in json.loads(FIXES.read_text()):
            part = parts[fix["part"]]
            idx = fix["index"]
            if part[idx] != fix["expect"]:
                raise SystemExit(
                    f"fix precondition failed part {fix['part']} idx {idx}: got {part[idx]!r} expected {fix['expect']!r}"
                )
            part[idx] = fix["replace"]
    raw = gzip.decompress(base64.b64decode("".join("".join(p) for p in parts)))
    digest = hashlib.sha256(raw).hexdigest()
    if digest != meta["sha256"]:
        raise SystemExit(f"HASH MISMATCH: got {digest} expected {meta['sha256']}")
    if len(raw) != meta["bytes"]:
        raise SystemExit(f"size mismatch {len(raw)} != {meta['bytes']}")
    text = raw.decode()
    for banned in ("ioredis", "@anthropic-ai/sdk", '"pg"'):
        if banned in text:
            raise SystemExit(f"banned marker still present: {banned}")
    if "16.4.3" not in text:
        raise SystemExit("next 16.4.3 missing from restored lock")
    (ROOT / "package-lock.json").write_bytes(raw)
    print(f"restored package-lock.json ({len(raw)} bytes, sha256={digest})")

if __name__ == "__main__":
    main()
