import { textToText } from "ai-models";
import { StandardContext } from "function-types";
import { StandardFunctionConfig } from "function-types";
import { AiApiCredentials } from "peer-types";
export const generateImaginePrompt = (
  context: StandardContext & { prompt: string },
) => {
  return textToText({
    model: "openai/chatgpt",
    chatCompletionMessages: [
      {
        content: `These are prompts for image generation, based on a user input:
  
    [User input]: painting of a home
    [Prompt]: A painting of craftsman home, idyllic, 1950s suburb, Impressionist, by Tooth Wu, , detailed, , 8k, HD, natural lighting
    
    [User input]: helen of troy
    [Prompt]: A photograph of helen of troy in royal greek clothing, Surrealist, by , artstation, epic, , , 
    
    [User input]: blonde woman
    [Prompt]: A concept art of Blonde haired very beautiful woman, with hat with ribbon, snowy forest background, hyperrealistic, by John Collier, , low angle shot, enamelled, highly detailed, 
    
    You can be very creative and play around with styles, background, settings, etc.
    
    [User input]: ${context.prompt}
    [Prompt]:`,
        role: "user",
      },
    ],
    me_personSlug: context.me_personSlug,
    relation_personSlug: context.relation_personSlug,
  });
};

generateImaginePrompt.config = {
  isPublic: true,
  priceCredit: 0.01,
  shortDescription: "Get an enhanced prompt to generate an image",
} satisfies StandardFunctionConfig;
