I generate video, audio, pictures and text. To make these things much more effective, I need:

**Setup boilerplate**

- [ ] Get the electron boilerplate to work within sensible so I can share ui and core
- [ ] Add package for node cli `king`

**iPhone/iPad to king storage**

- [ ] Take cli code from `create-sensible-app` as a starting point
- [ ] Refactor the flag commands into a settings object
- [ ] Script that watches `~/Pictures/Photos Library.photoslibrary` for new files, and moves all `videos` and `pictures` in those folders to `~/.king/videos` and `~/.king/pictures` (effectively removing them from iCloud)
- [ ] Create clear instructions on how to set up iCloud sync properly in order for this to work well

**Mac to king storage**

- [ ] Watch the download folder and copy downloads to king storage
- [ ] Set up that screenshots/recordings/video-recordings/pictures go into Downloads/recordings/\* (and document this)

**Electron Storage Explorer and markdown editor**

- [ ] explore storage
- [ ] crud md files
- [ ] add labels to pictures, videos, audios, texts

**pipeline 1**

- [ ] Texts with label code-from-anywhere is moved to processing
- [ ] Text is transcribed using say command (or better alternative, if free)
- [ ] Image is grabbed using gpt3 to get the main topic of the text and then get an image using an api
- [ ] Text is decorated
- [ ] Short texts are posted on LinkedIn and twitter
- [ ] Medium texts are posted on LinkedIn and Twitter threads
- [ ] Long texts are posted on blogs
- [ ] Video gets produced with text audio + images of bold words. This can follow pipeline 2

**pipeline 2**

- [ ] every new video in king storage that gets label code-from-anywhere and gets a title and description, is moved to processing folder
- [ ] intro and outro are added
- [ ] different ads are added every 5 minutes (with smooth transition, if possible)
- [ ] this video is then exported to a new `mp4/mov`
- [ ] exported video is then uploaded to YouTube public to my channel. main source file is removed
- [ ] after upload, exported file is also removed
- [ ] posts are also created on linkedin/twitter with a short description and the video

**Later**

- These pipelines can be created using an API and thus SDK so programmers can keep all pipelines as part of their codebase
- The app can have 24/7 recording functionality so you can distribute your whole life
