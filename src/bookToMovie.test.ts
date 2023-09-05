import { fs, path } from "fs-util";
import { writeToAssets } from "write-to-assets";

import { jsonGpt } from "gpt-parse-json";
export type Book = {
  text: string;
  chapters: { index: number; title: string; content: string }[];
};

export type BookAnalysis = {
  locations: {
    name: string;
    /** all information this chapter says about the location */
    description: string;
  }[];
  scenes: {
    location: string;
    setting: string;
    situation: string;
    characterSlugs: string[];
    /** First sentence of the text */
    textStartsWith: string;
  }[];
  characters: {
    slug: string;
    name: string;
    gender: string;
    /** all information this chapter says about the character */
    description: string;
    appearance: string;
    voice: string;
  }[];
};
/**

*/
export const bookToMovie = async (openAiToken: string, text: string) => {
  const words = text.split(" ").length;
  const sentences = text.split(".").length;
  console.log({ words, sentences });
  const result = await jsonGpt<BookAnalysis>(
    `Consider this chapter out of a book:

"""
${text}
"""

Analyse the book to fill in the datastructure.

`,
    `type BookAnalysis = {
      locations: {
        name: string;
        /** all information this chapter says about the location */
        description: string;
      }[];
      scenes: {
        location: string;
        setting: string;
        situation: string;
        characterSlugs: string[];
        /** First sentence of the text */
        textStartsWith: string;
      }[];
      characters: {
        slug: string;
        name: string;
        gender: string;
        /** all information this chapter says about the character */
        description: string;
        appearance: string;
        voice: string;
      }[];
    };`,
    { openAiToken },
    "openai/gpt4",
  );

  await writeToAssets(import.meta.path, result, "analysis.json");
  return result;
};

const text = fs.readFileSync(
  path.join(import.meta.dir, "..", "assets", "10-halloween.md"),
  "utf8",
);

bookToMovie(process.env.OPENAI_TOKEN!, text);
