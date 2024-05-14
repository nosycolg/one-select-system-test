include .env

.PHONY: up

up:
	docker-compose up -d && npm run pretest && npm run start

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f

.PHONY: test

test:
	docker-compose up -d && npm run pretest && npm run coverage
