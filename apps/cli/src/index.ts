// TODO: Create CLI application for the expense tracker using commander.js
import { Command } from "commander";
import { ArgParser } from "./argument.parser";

const program = new Command();

program
  .name("dist/index.js")
  .description("CLI Application to track expenses.")
  .version("1.0.0");

program
  .command("add")
  .description("Add an expense.")
  .requiredOption(
    "-d, --description <desc>",
    "Description for the expense.",
    ArgParser.parseDesc,
  )
  .requiredOption(
    "-a, --amount <amt>",
    "Amount you spent. [>0]",
    ArgParser.parseAmount,
  )
  .action((args) => {
    console.log(args);
  });

program
  .command("update")
  .description("Update an expense's description or amount.")
  .requiredOption("-i, --id <id>", "Target expense.", ArgParser.parseId)
  .option(
    "-d, --description <desc>",
    "Updates the expense's description.",
    ArgParser.parseDesc,
  )
  .option(
    "-a, --amount <amt>",
    "Update the expense's amount. [>0]",
    ArgParser.parseAmount,
  )
  .action((x) => {
    console.log(x);
  });

program
  .command("delete")
  .description("Delete an expense.")
  .requiredOption("-i, --id <id>", "Target expense.", ArgParser.parseId)
  .action((x) => {
    console.log(x);
  });

program
  .command("list")
  .description("List all expenses.")
  .action((x) => {
    console.log(x);
  });

program
  .command("summary")
  .description("List total expense since starting or for a specified month.")
  .option(
    "-m, --month <mnt>",
    "Month to select for. [1, 12]",
    ArgParser.parseMonth,
  )
  .option(
    "-y, --year <yr>",
    "Year to select for. [2000, 3000]",
    ArgParser.parseYear,
  )
  .action((x) => {
    console.log(x);
  });

program.parse();
