# create a docker image
Ensure your .bashrc is exporting GH_PKG_READ_TOKEN with the actual value

```bash
# Build the container
sudo docker image build \
    -f Dockerfile \
    -t cocktails-web:latest \
    --rm \
    --build-arg GH_PKG_READ_TOKEN=$GH_PKG_READ_TOKEN \
    --build-arg VITE_NODE_ENV=docker \
    .
```

# create a docker container (running an image)
```bash
sudo docker container run -d \
    --name cocktails-web \
    -p 4000:80 \
    -p 4001:443 \
    -v "$PWD/certs:/etc/nginx/certs:ro" \
    cocktails-web:latest
```


