import { ValidationError } from "expense-tracker-core";

export class ArgParser {
  protected static MONTHS: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  static parseId(id: string) {
    const pId = parseInt(id, 10);
    if (isNaN(pId) || pId <= 0)
      throw new ValidationError(
        "INVALID_VALUE_ID",
        "Id must be greater than 0.",
      );
    return pId;
  }

  static parseDesc(desc: string) {
    const pDesc = String(desc).trim();
    if (pDesc.length < 1)
      throw new ValidationError(
        "EMPTY_DESCRIPTION",
        "Empty description is not allowed.",
      );
    return pDesc;
  }

  static parseAmount(amt: string) {
    const pAmt = parseFloat(amt);
    if (isNaN(pAmt) || pAmt <= 0)
      throw new ValidationError(
        "INVALID_VALUE_AMOUNT",
        "Amount must be greater than 0.",
      );
    return pAmt;
  }

  static parseMonth(mntNum: string) {
    const pMntNum = parseInt(mntNum, 10);
    if (isNaN(pMntNum) || pMntNum < 1 || pMntNum > 12)
      throw new ValidationError(
        "INVALID_VALUE_MONTH",
        "Month can only be from 1 to 12.",
      );
    const pMnt = ArgParser.MONTHS[pMntNum - 1];
    return pMnt;
  }

  static parseYear(yr: string) {
    const pYr = parseInt(yr);
    if (isNaN(pYr) || pYr < 2000 || pYr > 3000)
      throw new ValidationError(
        "INVALID_VALUE_YEAR",
        "Year can only be from 2000 - 3000 AD.",
      );
    return pYr;
  }
}
