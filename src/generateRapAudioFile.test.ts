import { generateRapAudioFile } from "./generateRapAudioFile.js";
const test = () => {
  generateRapAudioFile({
    topicOrLyrics: "university of groningen",
    isExternalCall: false,
    me_personSlug: "wijnand",
    relation_personSlug: "root",
  }).then(console.log);
};

test();
