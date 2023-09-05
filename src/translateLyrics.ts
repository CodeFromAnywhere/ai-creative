import { StandardContext } from "function-types";
import { StandardFunctionConfig } from "function-types";
/**
 * If I make this and I can find a way to do this for under a cent per song, we can integrate with spotify playtlists (our youtube playlists, even easier) in order to create a way for people to much more easily learn a language through music.
 *
 * Once AI improves further, we might be able to use voice to voice, and input the original lyrics + the translated variant, to output a translated version that flows the same... This would be truly amazing.
 *
 * NB: Many of these steps are useful by themselves as plugins to, for example, open-ai.
 */
export const translateLyrics = async (
  context: StandardContext & {
    name: string;
    artist: string;
    targetLanguage: string;
  },
) => {
  // 1) Find the song on youtube and download it, or find it in our db if we already have it
  //-----
  // 2) Remove the music, just get the vocals, using something like spleeter
  //-----
  // 3) Transcribe the vocals to get the timestamped lyrics (we can't use the regular lyrics)
  //-----
  // 4) Clean up the whisper result to get only the lyrics
  //-----
  // 5) Ask GPT4 to come up with a lyrics in the target language that flows the same
  // -----
  // 6) Create a video where you'd get the new lyrics as subtitles (with the original below, smaller), overlapping the instrumental audio
  // ----
};

translateLyrics.config = {
  isPublic: false,
  categories: ["music"],
  shortDescription:
    "Create a translated version of your favorite song, and sing along to learn any new language!",
} satisfies StandardFunctionConfig;
