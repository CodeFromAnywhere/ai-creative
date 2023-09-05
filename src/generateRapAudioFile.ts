import { textToSpeechCached } from "ai-models";
import { textToText } from "ai-models";
import { ffmpegAddLyricsToSong } from "ffmpeg-util";
import { readFolderFileCollections } from "file-collection-util";
import { fs } from "fs-util";
import { path } from "fs-util";
import { makeRelative } from "fs-util-js";
import { normalizeFileToUrl } from "normalize-input";
import { StandardContext } from "function-types";
import { StandardFunctionConfig } from "function-types";
import { getProjectRoot } from "get-path";
import { notEmpty } from "js-util";
import { pickRandomArrayItem } from "js-util";
import { getAiApiCredentials } from "person-util";
import { readJsonFile } from "read-json-file";
import { jsonGpt } from "gpt-parse-json";
const styleObject = {
  //  "eminem-arpa2": "Eminem (Poetic rap answers)",
  // "snoop-dogg": "Snoop Dogg (Poetic rap asnwers)",
  // drake: "Drake (Poetic rap answers)",
  //jayz: "Jay-Z (Poetic rap answers)",
  // "rick-sanchez": "Rick Sanchez (Poetic rap answers)",
  // morty: "Morty from Rick and morty (poetic rap answers)",
  "damon-deepvoice": "rapping poetic rap songs",
  // vader: "Darth Vader rapping poetic rap songs",
  // default
  relikk: "rapping poetic rap songs",
};

const nonCommercialVoiceKeys = [
  //  "eminem-arpa2",
  // "snoop-dogg",
  // "drake",
  // "jayz",
  "rick-sanchez",
];
/**

This is a plugin!

TODO: 

- Make it possible to send out a template to the masses, preferably with a personal followup message and possibly some free messages. Ensure it's possible to filter on country as well to save money.

MAKE IT MP4 WITH SUBTITLES

- continue song until the end after rap is done
- check length of audio
- whisper audio to get srt
- create video with single image of the artist for the duration of the song (pick a AI generated art image)
- add the audio to the video
- add hard subtitles to the video (see https://www.bannerbear.com/blog/how-to-add-subtitles-to-a-video-file-using-ffmpeg/)
- don't output the lyrics anymore, just the video is enough
- store the video in the persons memory



How it works:

- Initial message should explain how it works and also immediately send a payment link
- Input = song description. About whom and (optionally) by which rappers
- Generate a lyrics for that without prefix / suffix using a good prompt (English)
- Choose a rapper based on the input or choose randomly
- Choose a song based on the rapper
- Get the voice of the lyrics with the right speaker
- Use `ffmpeg` to attach the background music with the voice output (at the right start second)
- Return the resulting ogg into WhatsApp


TODO

hip hop
https://www.youtube.com/watch?v=xd4dGsg1ZEM - 0:07
https://www.youtube.com/watch?v=kb5wuoPfsHs - 0:23



  const message = await translate(
    `Allright, will do! Give me a couple minutes! In the meantime, you can already come up with a next rap idea.
    
*Available artists include*:\n\n- Eminem\n- Snoop Dogg\n- Rick Sanchez\n- Darth Vader\n- Drake\n- Jay-Z\n- Damon Deepvoice

*Available genres*:\n\n- Techno\n- RnB\n- Reggae\n- Hip-Hop\n- Hardstyle\n- Electronic\n- Drum and Bass\n- Classical

Some examples (write them in English):

$examples

Remember: You can choose from the above artists and genres. You can come up with any story (or ask the AI to come up with it), you can name any friend or friends and tell more about them, you don't need to write lyrics, that will be done for you.
`,
    chatContext.translateConfig,
    {
      examples: `- Write me a rap about Laura's birthday. Laura hates doing the dishes and doesn't need to do it today. Rapped by Eminem
- It's mothers day, and I want to thank my mother Suzy for everything she did and especially for taking care of me when I was sick last winter. Techno song by Damon Deepvoice
- It's fathers day, I want you to tell my father (John) that he's the best and that I (Thomas) want to go hiking with him again in the alps this summer, go on a crazy adventure. Electronic style, rapped by Rick Sanchez
- It's christmas, our family is together. This year Yara is also there for the first time, the new baby who is so lovely to watch. Rap by snoop dogg in Reggae style.`,
    }
  );

  const simplifiedWavPath = await compressConvert(rapFile.outputPath, {
    targetFormat: "wav",
    is16bitWav: true,
    keepOriginal: true,
    isStatusLogged: true,
    name: `a${Math.round(Math.random() * 999999999999)}`,
  });

  if (!simplifiedWavPath) {
    return { isSuccessful: false, chatResponse: "conversion1 failed" };
  }
  const opusPath = await compressConvert(simplifiedWavPath, {
    targetFormat: "ogg",
    isOpus: true,
    keepOriginal: true,
  });

  if (!opusPath) {
    console.log(`result:${rapFile.outputPath}`);
    return {
      isSuccessful: false,
      chatResponse: "Something went wrong converting",
    };
  }

  console.log({ rapFile: rapFile.outputPath, simplifiedWavPath, opusPath });

  const returnMessage = rapFile.isNonCommercialVoice
    ? `These songs are provided solely for personal, non-commercial use. Any unauthorized use, including but not limited to, reproduction, distribution or public display of copyrighted materials, is strictly prohibited and may violate federal, state, or local laws. All rights reserved.
      
    In simple terms: Please note we are only supplying the tool and cannot provide you any rights to distribute the generated rap from ${rapFile.artistName}. Therefore, the resulting song MUST NOT BE DISTRIBUTED, unless you have explicit conscent from ${rapFile.artistName}.`
    : "";

  sendMessage({
    fromPersona: relationPersona,
    toPerson: mePerson,
    message: returnMessage,
    relation: otherRelation,
    assetFilePaths: [opusPath],
    emailConfig: { subject: "Your rap is here!" },
    preferredChannel: messagingChannel,
  });


 */
export const generateRapAudioFile = async (
  context: StandardContext & { topicOrLyrics: string },
) => {
  const projectRoot = getProjectRoot();
  if (!projectRoot) {
    return;
  }
  const { topicOrLyrics, ...standardContext } = context;

  const { credentials } = await getAiApiCredentials(standardContext);

  if (!credentials) {
    return;
  }

  const instrumentalFolder = path.join(
    projectRoot,
    "memory",
    "assets",
    "music-instrumental",
  );

  const genresAvailable = (
    await fs.readdir(instrumentalFolder, { withFileTypes: true })
  )
    .filter((x) => x.isDirectory())
    .map((x) => x.name);

  const jsonGptResult = await jsonGpt<{ voiceId: string; genre: string }>(
    `Consider the following user-message:

---

${topicOrLyrics}

---

Choose the voice and genre that would match best.`,
    `{"voiceId": "relikk"|"damon-deepvoice","genre": ${genresAvailable
      .map((x) => `"${x}"`)
      .join(" | ")}}`,
    credentials,
  );

  const rapperVoiceKey = jsonGptResult.jsonResponse?.voiceId || "relikk";
  const genre = jsonGptResult?.jsonResponse?.genre || "hip-hop";

  const rawGenreMusicFolder = (folder: string) =>
    path.join(instrumentalFolder, folder);
  const genreMusicFolder = fs.existsSync(rawGenreMusicFolder(genre))
    ? rawGenreMusicFolder(genre)
    : rawGenreMusicFolder(genresAvailable[0]);

  const style =
    styleObject[rapperVoiceKey as keyof typeof styleObject] ||
    "rapping poetic rap answers";

  // NB: if you use a rapper like eminem/snoop/etc then a watermark needs to be in the rap lyrics (this is not the real [name])
  const isNonCommercialVoice = nonCommercialVoiceKeys.includes(rapperVoiceKey);

  const name = style.split("(")[0];
  let absoluteRapSongsLocation = path.join(
    projectRoot,
    "memory",
    "persons",
    rapperVoiceKey,
    "music",
  );

  const artistMusicExists = fs.existsSync(absoluteRapSongsLocation);

  if (!artistMusicExists) {
    console.log(
      `artist doesn't have their own music! getting the genres music folder`,
      genreMusicFolder,
    );
    absoluteRapSongsLocation = genreMusicFolder;
  }

  const fileCollectionObject = await readFolderFileCollections(
    absoluteRapSongsLocation,
  );

  if (Object.keys(fileCollectionObject).length === 0) {
    return { isSuccessful: false, chatResponse: "No songs available" };
  }

  const songs = (
    await Promise.all(
      Object.values(fileCollectionObject).map(async (files) => {
        const mp3File = files.find((x) => x.endsWith(".mp3"));
        const jsonFile = files.find((x) => x.endsWith(".json"));

        if (!mp3File) {
          return;
        }

        let json: null | { name: string; startAtMs: number } = null;

        if (jsonFile) {
          json = await readJsonFile<{ name: string; startAtMs: number }>(
            path.join(absoluteRapSongsLocation, jsonFile),
          );
        }

        const mp3FilePath = path.join(absoluteRapSongsLocation, mp3File);

        return {
          name: json?.name,
          startAtMs: json?.startAtMs,
          audioPath: mp3FilePath,
        };
      }),
    )
  ).filter(notEmpty);

  if (songs.length === 0) {
    console.log(`didn't find a song!!!`, absoluteRapSongsLocation);
    return { isSuccessful: false, message: "Didn't find a song" };
  }

  const pickedSong = pickRandomArrayItem(songs);

  const systemMessage = `You are Rapli, a large language model developed by Chat AI. In all your answers, act as if you are ${style}. Ensure that the chorus repeats at least three times. ${
    isNonCommercialVoice
      ? `Start your lyrics with stating that you are not the real rapper and just an AI clone.`
      : ""
  }`;

  const chatResult = await textToText({
    model: "openai/gpt4",
    credentials,
    text: `${systemMessage}\n\n${topicOrLyrics}`,
    personSlug: context.me_personSlug,
  });

  const lyrics = chatResult.chatResponse;

  if (!lyrics) {
    return { isSuccessful: false, message: "Couldn't generate lyrics" };
  }
  console.log(`done with lyrics`);

  const result = await textToText({
    credentials,
    systemMessage:
      "You are Rapli, Please omit following words: verse 1/2/3, chorus, intro, outro, bridge, so that only the actual spoken rap/vocals remain. Don't change the actual lyrics",
    text: lyrics,
    personSlug: context.me_personSlug,
  });

  console.log(`done with clean lyrics`);
  //  console.log(result.chatResponse);
  // Get the voice of the lyrics with the right speaker

  if (!result.chatResponse) {
    return { isSuccessful: false, message: "Didn't make clean lyrics" };
  }

  const { projectRelativePath, priceCredit } = await textToSpeechCached({
    text: result.chatResponse,
    isLanguageEnforced: true,
    model: "uberduck",
    voiceKey: rapperVoiceKey,
    language: "english",
    targetFormat: "mp3",

    ...standardContext,
  });

  console.log(`done uberducking the clean lyrics`);

  if (!projectRelativePath) {
    console.log({ isSuccessful: false, message: "No mp3" });
    return;
  }

  const absoluteLyricsSpeechPath = path.join(projectRoot, projectRelativePath);

  const absolutePath = await ffmpegAddLyricsToSong(
    absoluteLyricsSpeechPath,
    pickedSong.audioPath,
    // NB: default after 5s
    pickedSong.startAtMs || 5000,
  );

  const finalProjectRelativePath = absolutePath
    ? makeRelative(absolutePath, projectRoot)
    : undefined;

  const url = absolutePath ? normalizeFileToUrl(absolutePath) : undefined;

  if (!url) {
    console.log("NO URL");
    return;
  }

  return {
    priceCredit,
    projectRelativePath: finalProjectRelativePath,
    url,
    //  lyrics: result.chatResponse,
    isNonCommercialVoice,
    artistName: name,
  };
};

generateRapAudioFile.config = {
  isPublic: true,
  emoji: "🧔🏿‍♂️",
  shortDescription:
    "Generate rap audio file and lyriced songs about any topic.",
  categories: ["music"],
  priceCredit: 0.05,
} satisfies StandardFunctionConfig;
