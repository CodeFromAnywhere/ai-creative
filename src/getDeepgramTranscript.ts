import sdk from "@deepgram/sdk";
import fs from "fs";
const { Deepgram } = sdk;

/**
Measure non-transcription latency: 
```
curl -sSf -w "latency: %{time_connect}\n" -so /dev/null https://api.deepgram.com
```
 */
export const getDeepgramTranscript = async (context: {
  credentials: { deepgramApiKey: string };
  url: string;
  mimetype: string;
}) => {
  // Your Deepgram API Key
  const {
    credentials: { deepgramApiKey },
    mimetype,
    url,
  } = context;
  // Location of the file you want to transcribe. Should include filename and extension.
  // Example of a local file: ../../Audio/life-moves-pretty-fast.wav
  // Example of a remote file: https://static.deepgram.com/examples/interview_speech-analytics.wav

  // Mimetype for the file you want to transcribe
  // Only necessary if transcribing a local file
  // Example: audio/wav
  // const mimetype = "audio/wav";

  // Initialize the Deepgram SDK
  const deepgram = new Deepgram(deepgramApiKey);

  // const file = fs.createReadStream("test.wav");
  console.time();
  // Send the audio to Deepgram and get the response
  const result = await deepgram.transcription
    .preRecorded(
      {
        url, //"https://peregrine-samples.s3.amazonaws.com/editor-samples/abram.wav", // ,
        //stream: file,
        //   stream: undefined,
        mimetype,
      },
      {
        smart_format: true,
        model: "nova",
      },
    )
    // .then((response) => {
    //   // Write the response to the console
    //   // console.dir({ response }, { depth: null });
    //   console.timeEnd();
    //   // Write only the transcript to the console
    //   console.dir(response.results?.channels[0]?.alternatives[0]?.transcript, {
    //     depth: null,
    //   });
    // })
    .catch((err) => {
      console.log(err);
      return;
    });

  console.dir({ result }, { depth: null });
  const transcript = result?.results?.channels[0]?.alternatives[0];

  return {
    isSuccessful: !!transcript,
    message: "Got it",
    transcript,
  };
};
