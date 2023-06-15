.PHONY: install db_prepare

install:
	(cd frontend && yarn install)
	(cd backend && yarn install)

db_prepare:
	(cd backend && yarn prisma db push)
	(cd backend && yarn prisma generate)
