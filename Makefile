all: docker-vite-service

docker-vite-service:
	docker build -t proxymurder/vite:latest ./