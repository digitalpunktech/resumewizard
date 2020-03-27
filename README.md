# Digital Punk : Resume Wizard

RoR application with Docker image

Docker is required to build and run this application - please [install Docker first](https://docs.docker.com/install/) before proceeding with the below actions.

## Docker

To build:

- run `docker-compose build`

To run:

- run `docker-compose run --rm --service-ports ruby_dev`

To run in multiple terminal windows:

- run `docker exec -it YOUR_CONTAINER_ID /bin/bash`

To exit bash or your container:

- run `exit`

To cleanup:

- run `docker-compose down`
- run `docker rmi rails-docker_ruby_dev`

## Rails

Starting the server:

- run `rails server -p $PORT -b 0.0.0.0`. Check your localhost:3000 to see if it's working.

Stopping the server:

- hit `ctrl-c` on your keyboard to stop the server.