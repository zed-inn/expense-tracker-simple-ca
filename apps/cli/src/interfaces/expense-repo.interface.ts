import fs from "fs/promises";
import { ExpenseRepository, NoExpenseError } from "expense-tracker-core";
import { Expense } from "expense-tracker-core/dist/domain/entities/expense";
import { env } from "@config/env";
import { DataCorruptedError } from "@error/database.error";

export type ExpenseModel = {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

export class JSONExpenseData {
  static async getData(): Promise<ExpenseModel[]> {
    const rawJson = await fs.readFile(env.data.file);
    const parsedJson = JSON.parse(rawJson.toString());
    if (!Array.isArray(parsedJson)) throw new DataCorruptedError();

    const parsedTypesJson = parsedJson.map((json) => {
      const data = {
        id: json.id,
        description: json.description,
        amount: json.amount,
        createdAt: new Date(json.createdAt),
        updatedAt: new Date(json.updatedAt),
      };

      const badId =
        typeof data.id !== "number" ||
        isNaN(data.id) ||
        data.id <= 0 ||
        !Number.isInteger(data.id);
      const badDesc =
        typeof data.description !== "string" || data.description.length < 1;
      const badAmount =
        typeof data.amount !== "number" ||
        isNaN(data.amount) ||
        data.amount <= 0;
      const badCreatedAt = isNaN(data.createdAt.getTime());
      const badUpdatedAt = isNaN(data.updatedAt.getTime());

      if (badId || badDesc || badAmount || badCreatedAt || badUpdatedAt)
        throw new DataCorruptedError();

      return data;
    });

    return parsedTypesJson;
  }

  static async writeData(data: ExpenseModel[]) {
    await fs.writeFile(env.data.file, JSON.stringify(data));
  }
}

export class JSONExpenseRepository implements ExpenseRepository {
  async getById(id: number): Promise<Expense> {
    const _data = await JSONExpenseData.getData();

    for (const d of _data) if (d.id === id) return new Expense(d);

    throw new NoExpenseError();
  }

  async getLatest(): Promise<Expense | null> {
    const _data = await JSONExpenseData.getData();

    if (_data.length === 0) return null;

    return new Expense(
      _data.reduce((x, y) =>
        x.createdAt.getTime() > y.createdAt.getTime() ? x : y,
      ),
    );
  }

  async getOldest(): Promise<Expense | null> {
    const _data = await JSONExpenseData.getData();

    if (_data.length === 0) return null;

    return new Expense(
      _data.reduce((x, y) =>
        x.createdAt.getTime() < y.createdAt.getTime() ? x : y,
      ),
    );
  }

  async remove(expense: Expense): Promise<void> {
    const _data = await JSONExpenseData.getData();
    const dataRemoved: typeof _data = [];

    for (const d of _data) if (d.id !== expense.id) dataRemoved.push(d);

    await JSONExpenseData.writeData(dataRemoved);
  }

  async save(expense: Expense): Promise<void> {
    const _data = await JSONExpenseData.getData();
    let found = false;

    for (let i = 0; i < _data.length; i++) {
      if (_data[i]?.id === expense.id) {
        _data[i] = {
          id: expense.id,
          description: expense.description,
          amount: expense.amount,
          createdAt: expense.createdAt,
          updatedAt: new Date(),
        };
        found = true;
        break;
      }
    }

    if (!found) {
      _data.push({
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        createdAt: expense.createdAt,
        updatedAt: expense.createdAt,
      });
    }

    await JSONExpenseData.writeData(_data);
  }
}
