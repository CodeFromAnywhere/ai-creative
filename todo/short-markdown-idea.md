# Markdown to TikTok

If I could generate a video based on a simple markdown format, it would be amazing. It should take audio and video snippets and some headings in between and attach them together.

# Algorithm idea:

- For every section, show the screenshots for the total duration for the audio found in te section. Divide the time of the screenshot shown equally between the time the audio takes for that section. Play all screenshots for the duration of the first audio found in that section.

- For every header, show it in a nice render, with animation, with some sound effect

# Improveable (post mvp)

It's probably hard to generate a good audio. If it's worth it I can do something like this:

To get the audio, show the screenshots and videos one by one as a slideshow, and go through it manually first. Time can be recorded on the first try. Then we know roundabout the time it takes to talk about every slide. Once you do this a couple of times, you can go faster and more smoothly. You can finally automatically slide to the next slides and create one smooth audio recording so there are no pauses.

# Generating the video

I can render an auto-played react slideshow + audio and simply record that to generate the video. I don't even need a video libarary, simply react and recording it after it works. Storing the video doesn't even cost space this way, except for the markdown and some play-code. This could be HUGE for marketing!

# Conclusion

If I do this, very simply, I can create great videos in no-time. Basically I can generate a good video in 10 minutes, which means I can make 50 videos in a day. That's 4500 videos in 3 months, which could all get hundreds of thousands of views. Even if they only get 10k views on average, that's still 45m views, which is 10k more than I have reach now on youtube, in a SINGLE DAY. This improves my overall marketing capacity with 4 orders of magnitude.

Compared to codestories on dev.to this may be much better! It seems obvious when you think about it.

# GOAL (MVP)

The first goal (MVP) is to create a high quality video from a markdown source. If this is actually a good video, the goal is to make the UX so that generating a video like this is super easy. Probably, the best thing would be to make it easy to immediately ask for an alt-text when you have a new recording or screenshot, and insert it into your file.
