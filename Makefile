DATABASE_COMPOSE_FILE = docker/database/docker-compose.yml
DEVELOPMENT_COMPOSE_FILE = docker/development/docker-compose.yml
STAGING_COMPOSE_FILE = docker/staging/docker-compose.yml
PRODUCTION_COMPOSE_FILE = docker/production/docker-compose.yml

.PHONY: development-build development-up development-build-up development-down development-down-build-up \
				staging-build staging-up staging-build-up staging-down staging-down-build-up \
				production-build production-up production-build-up production-down production-down-build-up \
				cleanup

## Development environment commands
development-build: ## Build the development docker image.
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) build

development-up: ## Start the development docker container.
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) up -d

development-build-up: ## Build and start the development docker container.
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) up --build -d

development-down: ## Stop the development docker container.
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) down

development-down-build-up: ## Stop, build and start the development docker container.
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) down && \
	docker compose -f $(DEVELOPMENT_COMPOSE_FILE) up --build -d

## Staging environment commands
staging-build: ## Build the staging docker image.
	docker compose -f $(STAGING_COMPOSE_FILE) build

staging-up: ## Start the staging docker container.
	docker compose -f $(STAGING_COMPOSE_FILE) up -d

staging-build-up: ## Build and start the staging docker container.
	docker compose -f $(STAGING_COMPOSE_FILE) up --build -d

staging-down: ## Stop the staging docker container.
	docker compose -f $(STAGING_COMPOSE_FILE) down

staging-down-build-up: ## Stop, build and start the staging docker container.
	docker compose -f $(STAGING_COMPOSE_FILE) down && \
	docker compose -f $(STAGING_COMPOSE_FILE) up --build -d

## Production environment commands
production-build: ## Build the production docker image.
	docker compose -f $(PRODUCTION_COMPOSE_FILE) build

production-up: ## Start the production docker container.
	docker compose -f $(PRODUCTION_COMPOSE_FILE) up -d

production-build-up: ## Build and start the production docker container.
	docker compose -f $(PRODUCTION_COMPOSE_FILE) up --build -d

production-down: ## Stop the production docker container.
	docker compose -f $(PRODUCTION_COMPOSE_FILE) down

production-down-build-up: ## Stop, build and start the production docker container.
	docker compose -f $(PRODUCTION_COMPOSE_FILE) down && \
	docker compose -f $(PRODUCTION_COMPOSE_FILE) up --build -d

## Cleanup command
cleanup: ## Free up space by removing unused docker images and volumes.
	docker system prune -af --volumes
