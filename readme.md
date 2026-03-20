# Expense Tracker (Monorepo)

A lightweight expense tracking app built as a monorepo with a clean separation between core domain logic and a CLI adapter.

- `core/`: business domain, entities, validation, use cases, interfaces
- `apps/cli/`: command-line interface, JSON file persistence, dependency wiring

---

## 🚀 What this app does

- Add expense records with `id`, `description`, `amount`, `createdAt`, `updatedAt`
- Update an existing expense (description and/or amount)
- Remove expenses by ID
- List all expenses
- Compute a summary total
- Compute monthly total summary by month+year (currently by month text name)

---

## 🏗️ Architecture

### core (domain/application)

- `core/src/domain/entities/expense.ts`
  - `Expense` entity with strict validation (id positive integer, description non-empty, amount positive, date valid)
  - mutators: `redescribe`, `changeAmount`
- `core/src/application/usecases/` contains use cases:
  - `AddExpense`, `RemoveExpense`, `UpdateExpense`, `ViewAllExpenses`, `ViewAllExpensesSummary`, `ViewAllExpensesSummaryByMonth`
- `core/src/application/interfaces/` defines abstractions:
  - `ExpenseRepository` (write model) with methods `getOldest`, `getLatest`, `getById`, `save`, `remove`
  - `ExpenseQuery` (read model) with `getAll`, `getBetweenInclusive`
  - `IdGenerator` with `generateIncremental`
- `core/src/index.ts` exposes `ExpenseApplication` and error types; wires use cases and ports.

### apps/cli (adapter/implementation)

- CLI commands in `apps/cli/src/index.ts` (Commander-based): `add`, `update`, `delete`, `list`, `summary`
- Config layer in `apps/cli/src/config/core.ts` linking `ExpenseApplication` to concrete implementations.
- JSON data store adapter:
  - `apps/cli/src/interfaces/expense-repo.interface.ts`: `JSONExpenseRepository` reads/writes `apps/cli/data/expenses.json`.
  - `apps/cli/src/interfaces/expense-query.interface.ts`: `JSONExpenseQuery` implements read methods.
  - `apps/cli/src/interfaces/id-generator.interface.ts`: `IncrementalExpenseIdGenerator` generates next ID.
- Validation and domain errors from core are preserved across adapter boundaries.

### Persistence

- File path controlled by `apps/cli/src/config/env.ts` (default `apps/cli/data/expenses.json`).

---

## 📦 Monorepo setup

1. From repo root:
   - `npm install`

2. Build core + app:
   - `npm run --workspace apps/cli build`

3. (Optional) start in dev watch mode:
   - `npm run --workspace apps/cli dev`

4. Run CLI:
   - `npm run --workspace apps/cli start -- <command>`
   - or `node apps/cli/dist/index.js <command>`

---

## 💻 CLI usage

Assuming package is built or using `npm run --workspace apps/cli dev`:

- Add:
  - `npm run --workspace apps/cli start -- add -d "Groceries" -a 150.75`
- Update:
  - `npm run --workspace apps/cli start -- update -i 1 -d "Supermarket" -a 160`
- Delete:
  - `npm run --workspace apps/cli start -- delete -i 1`
- List:
  - `npm run --workspace apps/cli start -- list`
- Summary (all time):
  - `npm run --workspace apps/cli start -- summary`
- Summary by month/year:
  - `npm run --workspace apps/cli start -- summary -m 1 -y 2026`

---

## 🧩 Error handling

- `core` throws domain/validation errors on invalid values.
- `apps/cli` throws `DataCorruptedError` if JSON is invalid or schema mismatch.
- Remove uses `NoExpenseError` when ID not found.

---

## 📁 Important paths

- `apps/cli/data/expenses.json`: persisted object list (`[ { id, description, amount, createdAt, updatedAt } ]`).
- `core/src/domain/entities/expense.ts`: input validation and domain behavior.
- `apps/cli/src/index.ts`: CLI commands mappings.

---

## 🛠️ Notes

- This repo is a beginner-level clean architecture sample.
- `core` is package-exported for potential reuse with other frontends.
- `apps/cli` is an implementation detail using JSON file store.
- This project was done as Roadmap.sh project (Expense Tracker)[https://roadmap.sh/projects/expense-tracker]
