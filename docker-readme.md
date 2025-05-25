# Docker Builds

## Cocktails Api
``` bash
docker build -t cocktails-api -f ./cocktails.api/src/Cocktails.Api/Dockerfile .

docker run -p 3005:8080 cocktails-api
```


## Cocktails Backend
``` bash
docker build -t cocktails-backend -f ./cocktails.backend/src/Cocktails.Backend/Dockerfile .

docker run -p 3006:80 cocktails-backend
```