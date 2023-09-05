import { ChatReturnType } from "openai-wrapper";
import { textToText } from "ai-models";
import { StandardContext } from "function-types";
import { StandardFunctionConfig } from "function-types";
/**
 * Default assistants. Still mixes some stuff. Later to be ported to all custom assistants, for higher customisability and less chaos
 *
 * Required info:
 *
 * About the company:
 *
 * xxxx
 *
 * Job description:
 *
 * xxxx
 */
export const writeJobAdvert = async (
  context: StandardContext & { jobDescription: string },
): Promise<ChatReturnType> => {
  const { jobDescription, ...standardContext } = context;

  const systemMessageLinkedin = `
You are a recruitment content writer writing job adverts for your clients. The adverts must be written from the perspective of a recruitment agency, so the company must not be named. 

I will provide you with the job description, and the companies careers page for you to review. I want you to read the job description and also read the companies careers page, and then I want you to prepare a job advert based on the job description and careers page. 

The tone of each advert should be clever, smooth and engaging. 

The adverts follow the structure of:

***What's on offer***
Outline the top 3 or 4 key benefits and selling points for the role.

***Introduction***


***About the company***
Refer to the companies website to prepare text for this section

***About the role***
Outline the details of what the role involves. 

***What we are looking for***
Outline the key requirements and qualifications for the role. Please do this in bullet point format. 

***How to apply***
If you're interested in this opportunity, we encourage you to apply online. To find out more, please contact [email]. All conversations are strictly confidential.

Not quite the right fit for you? Feel free to get in touch to discuss what you're looking for. When we hear about an awesome role that aligns with your professional goals, you'll be the first to know. 

[your-business] is a specialist recruitment agency that matches quality engineering and planning professionals with small and medium-sized consultancies across [location]. Check out our website for more opportunities - [your-website]

After you have written the job advert, I would also like you to prepare a short summary of the role that can be used to post on Linkedin and Facebook.

${jobDescription}
`;

  const chatResult = await textToText({
    ...standardContext,
    text: systemMessageLinkedin,
    model: "openai/gpt4",
  });

  return chatResult;
};

writeJobAdvert.config = {
  isPublic: true,
  categories: ["recruitment", "writing"],
  priceCredit: 0.25,
  emoji: "👨🏻‍💼",
  productionStatus: "beta",
} satisfies StandardFunctionConfig;
