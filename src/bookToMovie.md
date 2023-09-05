---
isPublic: true
domain: karsens.com
---

# Making a movie from a book using AI

Books describe vividly how things happen using text. Movies do so using visuals. A lot harder for AI to understand. I've thought earlier about analysing movies and re-creating them. Just because of Emad Mostaque. Crazy idea and it will probably be done at some point. But what if we start with something easier... Turning a book into a movie!

A book is pretty nice because it's a selfcontaining world that provides all information about itself that's available. It's also often less than 100k tokens so it may already fit entirely in some LLM's. A book can almost always be divided into chapters. In case of Harry Potter 1, my demobook, it contains 76k words over 17 chapters. In chapter 10 (Halloween) there are just 4155 words over ±300 sentences.

A book is describing what's happening while a movie is showing it. Oftenlike movies aren't an accurate depiction of what happened in the book. This is of course for good reason, because it would probably be quite long otherwise. But it also sometimes would've been nice if the movie would've been exactly the same.

I love the hitchhikers guide to the Galaxy radioplay. In this play, you just hear voices as in a movie, but it's the entire book. What if we can do the same for every book? And maybe even make it better with imagery? Hocus pocus, that sounds like magic! Let's give it a try with Harry Potter Chapter 10 - Halloween.

# Splitting books into chapters

A book or series of books can firstly be split into chapters. Since we don't always have access to the markdown book, and since the exact grammar of how a chapter is written out is sometimes different, we should use an LLM with a big context size to identify how we can split a book up into chapters.

In case the book doesn't really have chapters, the LLM should still be able to figure out when a very different thing starts. This might be harder, but would be very useful.

# Directing the movie

In order to make a movie, simply said, we need:

- scenes in different settings, situations and people
- characters with well-established physical appearance
- background music

We can use all information in the book in order to come up with this.

# Making a datastructure for a book

My plan is to use the below datastructure and try to fill it by linearly iterating over the chapters of the book using a large language model. For now I'll try and use GPT4 and see what it can do.

```ts
export type BookAnalysis = {
  locations: { name: string; description: string }[];
  scenes: {
    location: string;
    setting: string;
    situation: string;
    characterSlugs: string[];
    text: string;
  }[];
  characters: {
    slug: string;
    name: string;
    gender: string;
    description: string;
    appearance: string;
    voice: string;
  }[];
};
```

After some refactoring of my ai-models code to enable it to use up to 16k tokens (chatgpt) I got some pretty good result! This is certainly something I can work with! With GPT4 a single analysis of one chapter costs 45 cents already, so that's quite expensive, especialy considering that the result didn't seem much better than ChatGPT. More testing is needed to see if it's really worth it.

This is what ChatGPT gives me:

```json
{
  "locations": [
    {
      "name": "Hogwarts",
      "description": "Hogwarts is the magical school that Harry and his friends attend. It is described as a castle with corridors, classrooms, and the Great Hall."
    },
    {
      "name": "Great Hall",
      "description": "The Great Hall is where the students have their meals and gather for special events. It is described as having long tables and floating candles."
    },
    {
      "name": "Quidditch field",
      "description": "The Quidditch field is where the students play the game of Quidditch. It is described as having golden poles with hoops and seats for the spectators."
    },
    {
      "name": "Girls' bathroom",
      "description": "The girls' bathroom is where Hermione is cornered by the troll. It is described as a place where the troll knocks the sinks off the walls."
    },
    {
      "name": "Corridor",
      "description": "The corridor is where Harry and his friends encounter the troll and hide from it. It is described as being crowded with confused Hufflepuffs."
    }
  ],
  "scenes": [
    {
      "location": "Hogwarts",
      "setting": "Great Hall",
      "situation": "Unboxing of Harry's new broomstick",
      "characterSlugs": ["harry", "ron", "malfoy"],
      "textStartsWith": "As the owls flooded into the Great Hall as usual, everyone’s attention was caught at once by a long, thin package carried by six large screech owls."
    },
    {
      "location": "Hogwarts",
      "setting": "Entrance hall",
      "situation": "Encounter with Crabbe and Goyle",
      "characterSlugs": ["harry", "ron", "malfoy"],
      "textStartsWith": "They left the hall quickly, wanting to unwrap the broomstick in private before their first class, but halfway across the entrance hall they found the way upstairs barred by Crabbe and Goyle."
    },
    {
      "location": "Hogwarts",
      "setting": "Quidditch field",
      "situation": "First Quidditch training session",
      "characterSlugs": ["harry", "ron", "oliver", "malfoy"],
      "textStartsWith": "As seven o’clock drew nearer, Harry left the castle and set off in the dusk toward the Quidditch field."
    },
    {
      "location": "Hogwarts",
      "setting": "Marble staircase",
      "situation": "Argument with Hermione",
      "characterSlugs": ["harry", "ron", "hermione"],
      "textStartsWith": "“So I suppose you think that’s a reward for breaking rules?” came an angry voice from just behind them. Hermione was stomping up the stairs, looking disapprovingly at the package in Harry’s hand."
    },
    {
      "location": "Hogwarts",
      "setting": "Quidditch field",
      "situation": "Quidditch practice with Wood",
      "characterSlugs": ["harry", "ron", "oliver"],
      "textStartsWith": "Too eager to fly again to wait for Wood, Harry mounted his broomstick and kicked off from the ground."
    },
    {
      "location": "Hogwarts",
      "setting": "Charms classroom",
      "situation": "Charms class with Professor Flitwick",
      "characterSlugs": ["harry", "ron", "hermione", "malfoy"],
      "textStartsWith": "On Halloween morning they woke to the delicious smell of baking pumpkin wafting through the corridors."
    },
    {
      "location": "Hogwarts",
      "setting": "Girls' bathroom",
      "situation": "Encounter with the mountain troll",
      "characterSlugs": ["harry", "ron", "hermione"],
      "textStartsWith": "Someone knocked into Harry as they hurried past him. It was Hermione."
    },
    {
      "location": "Hogwarts",
      "setting": "Great Hall",
      "situation": "Halloween feast",
      "characterSlugs": [
        "harry",
        "ron",
        "hermione",
        "quirrell",
        "snape",
        "mcgonagall",
        "dumbledore"
      ],
      "textStartsWith": "The common room was packed and noisy. Everyone was eating the food that had been sent up."
    }
  ],
  "characters": [
    {
      "slug": "harry",
      "name": "Harry Potter",
      "gender": "male",
      "description": "Harry is the main protagonist of the book. He is described as having messy black hair and glasses.",
      "appearance": "messy black hair, glasses",
      "voice": "not specified"
    },
    {
      "slug": "ron",
      "name": "Ron Weasley",
      "gender": "male",
      "description": "Ron is Harry's best friend. He is described as having red hair and freckles.",
      "appearance": "red hair, freckles",
      "voice": "not specified"
    },
    {
      "slug": "malfoy",
      "name": "Draco Malfoy",
      "gender": "male",
      "description": "Malfoy is Harry's rival. He is described as having blonde hair and a sneering expression.",
      "appearance": "blonde hair, sneering expression",
      "voice": "not specified"
    },
    {
      "slug": "oliver",
      "name": "Oliver Wood",
      "gender": "male",
      "description": "Oliver is the Quidditch team captain. He is described as being enthusiastic about Quidditch.",
      "appearance": "not specified",
      "voice": "not specified"
    },
    {
      "slug": "hermione",
      "name": "Hermione Granger",
      "gender": "female",
      "description": "Hermione is Harry and Ron's friend. She is described as being bossy and a know-it-all.",
      "appearance": "not specified",
      "voice": "not specified"
    },
    {
      "slug": "quirrell",
      "name": "Professor Quirrell",
      "gender": "male",
      "description": "Professor Quirrell is a teacher at Hogwarts. He is described as having a turban askew and a terrified expression.",
      "appearance": "turban askew, terrified expression",
      "voice": "not specified"
    },
    {
      "slug": "snape",
      "name": "Professor Snape",
      "gender": "male",
      "description": "Professor Snape is a teacher at Hogwarts. He is described as giving Harry a piercing look.",
      "appearance": "not specified",
      "voice": "not specified"
    },
    {
      "slug": "mcgonagall",
      "name": "Professor McGonagall",
      "gender": "female",
      "description": "Professor McGonagall is a teacher at Hogwarts. She is described as being angry and disappointed.",
      "appearance": "not specified",
      "voice": "not specified"
    },
    {
      "slug": "dumbledore",
      "name": "Professor Dumbledore",
      "gender": "male",
      "description": "Professor Dumbledore is the headmaster of Hogwarts. He is described as being informed of the events.",
      "appearance": "not specified",
      "voice": "not specified"
    }
  ]
}
```

Pretty good right! Please note that it can certainly be made better by asking the LLM less details per prompt and doing the different facts in parallel prompts. But even like this it's already great!

# Augmenting locations and characters

The next step is to extract the full text of each scene. Possibly it'll be more accurate if I also ask for the last few words of each scene, so I can create a matcher that doesn't depend on the next scene's start-text. This will reduce error.

Another next step is to iterate over each chapter and include the result of locations and characters up until that point. This way we build a dataset of all characters in the book, so we can later provide the AI with much better context.

# Storyboarding; Context-driven scene detail imagination

Once I have all that, I can summarize and augment characters and locations with more imaginative details. Especially regarding visuals and facts about them like age, clothing, etc. It needs to be super detailed so the AI can't guess anything. Also locations should not have ambiguity. Everything should be clear. This is probably going to be the hardest part to create consistency across scenes.

Now that we have a consistent factbase for people and places, we can compose the scenes in more detail.

Our source context for the prompt is the location, all people, and the raw text of the entire scene. We are looking for all building blocks to make it a movie, and we should be able to generate this with multiple prompts:

- What is shown in the picture (people, objects, angle)
- Who is talking, when, to who, with what emotion, etc.
- What is suitable music for this scene?
- Clear visual descriptions of the scenes

Now we will have a datastructure capable of generating the movie. It will be a challenge to time everything right, to make it realistic, etc. It will be a whole other challenge to create moving images instead of still image-generated images. But this is something I don't know enough about yet. I think even an animation series with horrible drawing is already hard. So for now, let's start with simple cartoon stories.

# Possibilities are endless

If I make the time for this, I wouldn't be surprised to end up with some sort of video of a comic with voices that sort of reflects a book. This is already a product that makes books "watchable" which is super cool!

But I think the true power lies in changing it. What if you could add a character into the book to make it more personal? Mix books together? Making the movie shorter? More gore? Less scary? The book now becomes the source of a movie and that source can be bent more easily than moving pictures.Powerful GPT's will be able to do much in writing and this technology could bring this writing to life.

This could be the start of a generative Netflix. Making movies will never be the same... https://chat.openai.com/share/5ed6b0dd-53c9-4be1-b68e-71522e8bf35a
