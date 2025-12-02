# Regenerate ssl
```bash
openssl req -x509 -nodes -days 9999 -newkey rsa:2048 -keyout local.key -out local.crt -config localhost.conf -extensions v3_req
```