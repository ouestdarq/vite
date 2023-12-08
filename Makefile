all: vite-latest

vite-latest:
	docker build -t proxymurder/vite:latest -f Dockerfile ./