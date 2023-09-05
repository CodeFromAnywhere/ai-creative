# Back to Node.js

- ✅ Migrate all `Bun.serve` server-stuff to something that is node.js-compatible but also good on bun! After some research I found that I may be able to port from `Bun.serve` to `hono` (https://hono.dev/getting-started/nodejs) since it's a framework much faster on Bun, and also supports node.js
- ✅ Remove all usage of `Bun.file` and replace that with the right way to serve files (create a wrapper function for this).
- If `memory/domains/*/public` exists, serve that on the domain using `getCtmlServerResponse`.
- Expose `generateSongVideo` endpoint on a server running node.js in production

# Rapli Landingpage

- nice landingpage with examples
- from a CTML website, have people fill in a form (topic, song?, phone?) and call it a "generation", redirect to stripe to pay €2
- after payment you receive the first result and are logged in where you see the form and your past generations
- every generation gets emailed and whatsapped to you. ask users to film the response of their friends and send to us to win €100
- if out of credit, offer to buy 10 more generations for €5 or 100 for €25
- make landingpage super cool

# Rapli Launch

- finish `generateSongVideo` endpoint (see there)
- Whatsapp old members of ChatAI and Rapli with a template message so they can try Rapli 2.0 for free
- launch new version on ProductHunt
- make the lyrics better by retrying with error message if the ai generated lyrics lettercount per sentence is longer than allowed or if the amount of sentences isn't correct
- play around with making longer lyrics with concatenating multiple lyrics of the same song
- every special day (mother's day, father's day, christmas, etc) there should be an email and whatsapp template going out to everyone
- other emails going out: new songs, cool generations, new features, etc.
- make it possible to view generations and send them to people via a phone call
- focus landingpage on reaction videos rather than just the transcript
