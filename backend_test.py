import json
import os
import urllib.error
import urllib.request

BASE_URL = os.environ.get("NEXT_PUBLIC_BASE_URL", "https://advisory-portal-51.preview.emergentagent.com").rstrip("/")


def request(method, path):
    req = urllib.request.Request(f"{BASE_URL}/api{path}", method=method, headers={"User-Agent": "backend-api-test/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as res:
            body = res.read()
            return res.status, dict(res.headers), body
    except urllib.error.HTTPError as res:
        body = res.read()
        return res.code, dict(res.headers), body


def main():
    checks = []
    for method, path in [("GET", "/root"), ("GET", "/unknown-route"), ("OPTIONS", "/root")]:
        try:
            status, headers, body = request(method, path)
            payload = json.loads(body) if body else None
            if method == "GET" and path == "/root":
                ok = status == 200 and payload.get("ok") is True and isinstance(payload.get("message"), str) and payload["message"]
            elif method == "GET" and path == "/unknown-route":
                ok = status == 404 and isinstance(payload, dict) and isinstance(payload.get("error"), str)
            else:
                ok = status == 204 and not body
            checks.append(ok)
            print(f"PASS: {method} /api{path} -> {status} payload={payload!r}" if ok else f"FAIL: {method} /api{path} -> {status} payload={payload!r} body={body!r}")
        except Exception as exc:
            checks.append(False)
            print(f"FAIL: {method} /api{path} raised {exc!r}")
    return 0 if all(checks) else 1


if __name__ == "__main__":
    raise SystemExit(main())
