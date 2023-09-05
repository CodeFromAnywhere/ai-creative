import { StandardContext } from "function-types";
import { chatCompletion, openAiWhisper } from "openai-wrapper";
import { getAiApiCredentials } from "person-util";
import { simpleJsonGpt } from "gpt-parse-json2";
import { client } from "@gradio/client";

export const songTemplateObject = {
  //['Deck the Halls by Cecilia', 'Move your Body by Cecilia', 'Dark Trap by Jerry', 'Happy Birthday by Jerry', 'Levitate by Ed']
  "Move your Body by Cecilia": `this is just a test  
don’t worry now  
the lyrics will come the less you think about them  
just feel the melody`,
  "Dark Trap by Jerry": `this is just a test  
don't worry about what I say  
the lyrics want to  go crazy  
when pushed too hard  
take it easy and relax  
this is moving too fast  
I can help you be  
a better singer`,
  "Happy Birthday by Jerry": `happy birthday to you   
happy birthday to you!   
happy birthday dear Laura  
happy birthday to you!`,
  "Deck the Halls by Cecilia": `Deck the halls with boughs of holly  
Fa la la la la, la la la la   
'Tis the season to be jolly  
Fa la la la la, la la la la`,
  "Levitate by Ed": `this is just a test  
don’t worry about what I say  
the lyrics want to go crazy  
when pushed too hard`,
};

/**



*/

export const generateSongVideo = async (
  context: StandardContext & {
    song?: keyof typeof songTemplateObject;
    instructions: string;
  },
) => {
  const { instructions, song, ...standardContext } = context;
  const { credentials } = await getAiApiCredentials(standardContext);
  if (
    !credentials ||
    !credentials.huggingfaceAuthToken ||
    !credentials.openAiToken ||
    !credentials.deepgramApiKey
  ) {
    return { isSuccessful: false, message: "No creds" };
  }

  const { openAiToken } = credentials;
  const template = songTemplateObject[song || "Move your Body by Cecilia"];

  const sentenceCount = template.split("\n").filter((x) => x.length > 0).length;
  const prompt = `consider this template lyrics:

"""
${template}
"""

This lyrics has ${sentenceCount} sentences.

The user wants to have a lyrics and provided these instructions:

"""
${instructions}
"""

Please write a lyrics in the same format as the template lyrics. Never create longer sentences, shorter is better.`;

  const result = await chatCompletion([{ content: prompt, role: "system" }], {
    credentials: { openAiToken },
    model: "gpt4",
  });

  if (!result.chatResponse) {
    return { isSuccessful: false, message: "Lyrics couln't be made" };
  }

  const jsonGptResult = await simpleJsonGpt<{ lyrics: string }>(
    `Consider this response of an AI lyrics generator
  
"""
${result.chatResponse}
"""

Return the lyrics`,
    '{ "lyrics": string }',
    { openAiToken },
  );

  const lyrics = jsonGptResult.jsonResponse?.lyrics;

  if (!lyrics) {
    return {
      isSuccessful: false,
      message: "No lyrics",
    };
  }
  const priceCredit =
    (result.priceCredit || 0) + jsonGptResult.priceCredit + 0.005;

  console.log({ song, lyrics });
  const app = await client("https://voicemod-text-to-sing.hf.space/", {
    hf_token: credentials.huggingfaceAuthToken as `hf_${string}`,
    status_callback: (a) => {
      console.log(a);
    },
  });

  const prediction = (await app.predict(1, [song, lyrics])) as {
    type: string;
    time: Date;
    data: [[{ name: string; data: null; is_file: boolean; orig_name: string }]];
    endpoint: string;
    fn_index: number;
  };

  const filename = prediction.data[0][0].name;
  const url = `https://voicemod-text-to-sing.hf.space/file=${filename}`;

  console.log({ url });

  // A) turn this into wav and get the url for that (my server should have a function for that, uri to url)
  // const wavUrl = url;

  // const transcriptionResult = await getDeepgramTranscript({
  //   credentials: { deepgramApiKey: credentials.deepgramApiKey },
  //   mimetype: "audio/wav",
  //   url: wavUrl,
  // });
  // console.log({ transcriptionResult });

  // B) IMAGES VIDEO
  // generate cohesive image generation idea for every sentence in the lyrics
  // generate a prompot for each idea
  // generate images for the prompts
  // make a video with the images on the right frames (ffmpeg should be able to do this)

  // C) SUBTITLES
  // turn the word timestamps into a .srt file
  // add subtitles to the video
  // https://www.bannerbear.com/blog/how-to-add-subtitles-to-a-video-file-using-ffmpeg/
  // expose the video as URL and projectRelativePath

  return { isSuccessful: true, lyrics, priceCredit, url };
};
