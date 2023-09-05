import { chatCompletion } from "openai-wrapper";

export const chooseCommand = async (transcript: string) => {
  const fileCommands = [
    "searchFiles",
    "openFile",
    "newFile",
    "promptCurrentFile",
    "appendToCurrentFile",
    "cleanCurrentFile",
    "cancelRecording",
    "sendRecording",
    "speakCurrentFile",
    "stopSpeaking",
    "skipAlinea",
  ];

  const messageCommands = [
    "openChat",
    "findChat",
    "listRecentChats",
    "promptCurrentChat",
    "speakCurrentChat",
    "skipMessage",
    "writeMessage",
    "editMessage",
    "speakWrittenMessage",
    "cancel",
    "sendMessage",
  ];

  const prompt = `
Consider this transcript of what the user just said:

"""
${transcript}
"""

Return with a single word containing the most suitable command. If no command is suitable, respond with "null".

**File commands**

${fileCommands.map((x) => `- ${x}`).join("\n")}

**Message commands**

${messageCommands.map((x) => `- ${x}`).join("\n")}

`;

  const credentials = { openAiToken: "" };

  const result = await chatCompletion([{ role: "system", content: prompt }], {
    credentials,
    model: "chatgpt",
  });

  const command = result.chatResponse;

  if (!command || !fileCommands.concat(messageCommands).includes(command)) {
    return;
  }

  return command;
};
