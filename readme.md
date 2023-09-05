# Ai music

ai-music (`OperationClassification` undefined)



# Api reference

## generateRap()

This is a plugin!


TODO:

- Make it possible to send out a template to the masses, preferably with a personal followup message and possibly some free messages. Ensure it's possible to filter on country as well to save money.

MAKE IT MP4 WITH SUBTITLES

- continue song until the end after rap is done
- check length of audio
- whisper audio to get srt
- create video with single image of the artist for the duration of the song (pick a AI generated art image)
- add the audio to the video
- add hard subtitles to the video (see https://www.bannerbear.com/blog/how-to-add-subtitles-to-a-video-file-using-ffmpeg/)
- don't output the lyrics anymore, just the video is enough
- store the video in the persons memory


| Input      |    |    |
| ---------- | -- | -- |
| chatContext | `ChatContext` |  |,| chatMessage | `CreateOrmItem<ChatMessage>` |  |,| truncatedMessageHistory | `CreateOrmItem<ChatMessage>`[] |  |
| **Output** |    |    |



## 📄 generateRap (exported const)

This is a plugin!


TODO:

- Make it possible to send out a template to the masses, preferably with a personal followup message and possibly some free messages. Ensure it's possible to filter on country as well to save money.

MAKE IT MP4 WITH SUBTITLES

- continue song until the end after rap is done
- check length of audio
- whisper audio to get srt
- create video with single image of the artist for the duration of the song (pick a AI generated art image)
- add the audio to the video
- add hard subtitles to the video (see https://www.bannerbear.com/blog/how-to-add-subtitles-to-a-video-file-using-ffmpeg/)
- don't output the lyrics anymore, just the video is enough
- store the video in the persons memory

# CLI

<details><summary>Show CLI information (2)</summary>
    
  # cli()




| Input      |    |    |
| ---------- | -- | -- |
| - | | |
| **Output** |    |    |



## 📄 cli (unexported const)

  </details>

# Tests

<details><summary>Show test information(2)</summary>
    
  # test()




| Input      |    |    |
| ---------- | -- | -- |
| - | | |
| **Output** |    |    |



## 📄 test (unexported const)

  </details>

# Internal

<details><summary>Show internal (2)</summary>
    
  # translateLyrics()

If I make this and I can find a way to do this for under a cent per song, we can integrate with spotify playtlists (our youtube playlists, even easier) in order to create a way for people to much more easily learn a language through music.

Once AI improves further, we might be able to use voice to voice, and input the original lyrics + the translated variant, to output a translated version that flows the same... This would be truly amazing.

NB: Many of these steps are useful by themselves as plugins to, for example, open-ai.


| Input      |    |    |
| ---------- | -- | -- |
| name | string |  |,| artist | string |  |,| targetLanguage | string |  |
| **Output** |    |    |



## 📄 translateLyrics (exported const)

If I make this and I can find a way to do this for under a cent per song, we can integrate with spotify playtlists (our youtube playlists, even easier) in order to create a way for people to much more easily learn a language through music.

Once AI improves further, we might be able to use voice to voice, and input the original lyrics + the translated variant, to output a translated version that flows the same... This would be truly amazing.

NB: Many of these steps are useful by themselves as plugins to, for example, open-ai.
  </details>

