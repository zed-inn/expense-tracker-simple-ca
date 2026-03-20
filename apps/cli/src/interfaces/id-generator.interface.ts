import { IdGenerator } from "expense-tracker-core";
import { JSONExpenseData } from "./expense-repo.interface";

export class IncrementalExpenseIdGenerator implements IdGenerator {
  async generateIncremental(): Promise<number> {
    const _data = await JSONExpenseData.getData();

    if (_data.length === 0) return 1;

    const highestIdData = _data.reduce((x, y) => (x.id > y.id ? x : y));
    return highestIdData.id + 1;
  }
}
