---
name: api-endpoint
description: Add or modify API endpoints with database schema changes and OpenAPI docs in this repo.
---

# API, Database, and OpenAPI Skill

## When to use

Use this skill when a request requires:

- A new or updated API endpoint.
- Database schema changes or migrations.
- Updates to OpenAPI documentation or API docs routes.

## Instructions

1. Read the product spec or request details, plus `FEATURES.md` when scope is unclear.
2. Identify an existing endpoint or feature to mirror for structure and conventions.
3. Define the API surface:
   - Route path and HTTP method.
   - Request and response shapes.
   - Error cases and status codes.
4. Plan file changes across layers:
   - API handlers in `apps/web/` (app router).
   - Shared route definitions in `apps/web/routes.ts` (avoid hardcoded paths).
   - Database schema in `packages/database/prisma/schema.prisma`.
   - OpenAPI docs in `openapi.json` and `docs/route.ts`.
5. Implement schema updates and migrations:
   - Keep models minimal and aligned to the spec.
   - Add enums only when they are required by the API contract.
6. Implement the API endpoint:
   - Use shared packages (`database`, `environment`, `blob-storage`) instead of duplicating logic.
   - Validate inputs and return typed responses.
7. Update OpenAPI documentation:
   - Add or update paths, request bodies, and response schemas.
   - Keep the API surface abstract when required (avoid over-modeling variants).

## Notes

- Follow existing patterns in similar features before introducing new abstractions.
- Avoid installing dependencies at the repo root unless shared by multiple apps/packages.
