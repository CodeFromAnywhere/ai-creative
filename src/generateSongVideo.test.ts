import { generateSongVideo, songTemplateObject } from "./generateSongVideo.js";
import { getObjectKeysArray } from "js-util";
const test = async () => {
  const results = await Promise.all(
    getObjectKeysArray(songTemplateObject).map(async (song, index) => {
      if (index > 0) {
        return;
      }
      return await generateSongVideo({
        instructions: "Bruna Cloud, a genius iOS developer girl",
        song,
        me_personSlug: "wijnand",
        relation_personSlug: "root",
      });
    }),
  );

  console.log({ results });
};

test();
