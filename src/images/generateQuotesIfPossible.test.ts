import { fs } from "fs-util";
import { path } from "fs-util";
import { getProjectRoot } from "get-path";
import { generateQuotesIfPossible } from "./generateQuotesIfPossible.js";
const projectRoot = getProjectRoot();

if (!projectRoot) {
  process.exit();
}

const absolutePersonBasePath = path.join(
  projectRoot,
  "memory",
  "persons",
  "bob-marley"
);

const quotesPath = path.join(
  absolutePersonBasePath,
  "statements",
  "quotes.json"
);

generateQuotesIfPossible("Bob Marley", quotesPath, {});
