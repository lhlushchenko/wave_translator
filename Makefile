prepare:
	cp backend/.env.example backend/.env
	cp frontend/.env.example frontend/.env

build:
	docker compose up --build

down:
	docker compose down