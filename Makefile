.PHONY: help

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## View logs
	docker-compose logs -f

db-shell: ## Access PostgreSQL shell
	docker-compose exec postgres psql -U postgres -d company_db

db-reset: ## Reset database (WARNING: deletes all data)
	docker-compose down -v
	docker-compose up -d postgres

build: ## Rebuild containers
	docker-compose up -d --build

restart: ## Restart all services
	docker-compose restart

ps: ## Show running containers
	docker-compose ps

pgadmin: ## Open pgAdmin in browser
	@echo "Opening pgAdmin at http://localhost:5050"
	@echo "Email: admin@admin.com"
	@echo "Password: admin"

migration-generate: ## Generate a new migration
	npm run migration:generate -- src/shared/infrastructure/database/migrations/$(name)

migration-run: ## Run pending migrations
	npm run migration:run

migration-revert: ## Revert last migration
	npm run migration:revert