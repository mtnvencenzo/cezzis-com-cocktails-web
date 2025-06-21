# create a docker image
docker image build -f "Dockerfile" -t cocktails-web:latest --rm .

# create a docker container (running an image)
docker container run -p 8080:80 -p 443:443 cocktails-web:latest
docker container run -d -p 4000:80 -p 4001:443 --name cocktails-web-test-1 cocktails-web:latest

