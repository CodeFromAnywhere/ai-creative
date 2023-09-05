import { textToImage } from "ai-models";
import { fs } from "fs-util";
import { path } from "fs-util";
import { getProjectRoot } from "get-path";
import { AiApiCredentials } from "peer-types";
import { StandardContext } from "function-types";
import { generateImaginePrompt } from "./generateImaginePrompt.js";
/**
Generates images about a person to be stored in `memory/persons/[slug]/images/public/*.jpg`
 */
export const generatePersonPublicImages = async (
  context: StandardContext,
  name: string,
  slug: string,
  noMasterpiece?: boolean,
) => {
  const projectRoot = getProjectRoot();
  if (!projectRoot) {
    return;
  }
  const absolutePublicImagesFolder = path.join(
    projectRoot,
    "memory",
    "persons",
    slug,
    "images",
    "public",
  );

  if (!fs.existsSync(absolutePublicImagesFolder)) {
    await fs.mkdir(absolutePublicImagesFolder, { recursive: true });
  }

  const alreadyLength = (await fs.readdir(absolutePublicImagesFolder)).length;
  /////
  // use stable diffusion (open journey) to generate 20 images from $name. Assume it succeeds but takes a while
  await Promise.all(
    new Array(20).fill(null).map(async (_, index) => {
      const absolutePublicImagesPath = path.join(
        absolutePublicImagesFolder,
        `${index + alreadyLength}.png`,
      );

      const prompt = `${name}, masterpiece, art`;
      const imaginePrompt = (
        await generateImaginePrompt({ ...context, prompt })
      )?.chatResponse;

      if (!imaginePrompt) {
        return;
      }
      const imageResult = await textToImage({
        prompt: noMasterpiece ? name : imaginePrompt,
        ...context,
      });

      if (imageResult?.images?.[0]?.absolutePath) {
        fs.rename(
          imageResult?.images?.[0]?.absolutePath,
          absolutePublicImagesPath,
        );
      }
    }),
  );
};
