import { fs } from "fs-util";
import { path } from "fs-util";
import { jsonGpt } from "gpt-parse-json";
import { SimpleStatement } from "./SimpleStatement.js";
import { AiApiCredentials } from "peer-types";
/**
 * Uses LLM to generate quotes and store it to the right path
 */
export const generateQuotesIfPossible = async (
  personName: string,
  quotesPath: string,
  credentials: AiApiCredentials,
): Promise<SimpleStatement[] | undefined> => {
  const folderPath = path.parse(quotesPath).dir;
  if (!fs.existsSync(folderPath)) {
    await fs.mkdir(folderPath, { recursive: true });
  }
  const quotes = await jsonGpt<{ quotes: string[] }>(
    `Give me 20 quotes of ${personName}. Don't add numbers`,
    "{ quotes: string[] }",
    credentials,
  );

  console.log({ quotes: quotes.jsonResponse?.quotes, quotes2: quotes });

  const simpleStatements = quotes.jsonResponse?.quotes?.map?.((x) => ({
    description: x,
  }));

  if (simpleStatements) {
    await fs.writeFile(
      quotesPath,
      JSON.stringify(simpleStatements, null, 2),
      "utf8",
    );
  }
  return simpleStatements;
};
