// 200ms from europe to us
// 200ms wachten tot stoppen praten: VAD
// 300ms transcripe (stream, non final)
// 300ms openai, generate stopword
// 200ms back to europe
export const stopWordPrompt = `
Consider this last sentence of the user:

"""
XXXX
"""

Choose the best stopword to speak while thinking about your answer:

1 = uhm
2 = ok
3 = good question!
4 = aha
5 = let me think about that
6 = repeat core of last sentence
...


`;
