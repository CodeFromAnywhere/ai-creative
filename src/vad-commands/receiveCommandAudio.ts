import { chooseCommand } from "./chooseCommand";

export const getDeepgramTranscript = async (audio: any) => {
  // TODO: implement deepgram.com api
  return "This would be the transcript, if any";
};

/**
`receiveCommandAudio` can be an api used in the browser and the command is returned to the browser to be applied there

For streaming voicecalls, we can do a similar thing like this, but instead, we need to run vad in node. Ideally, we should use the streaming implementation, but it's not there yet. See https://www.vad.ricky0123.com/docs/node/

We can then tie each action to a textual result like in a chat and speak that out asap

 */
export const receiveCommandAudio = async (req: Request) => {
  const audio = undefined;

  const transcript = await getDeepgramTranscript(audio);
  const command = await chooseCommand(transcript);

  return {
    isSuccessful: true,
    message: "Transcribed and chosen",
    command,
  };
};
