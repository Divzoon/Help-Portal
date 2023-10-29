# AI Text-To-Voice Models
- AudioLM based on (semantic and acoustic tokens)
- Bark  based on (GPT-style models)
- Vall-E  based on (encodec)


# GPT-style models
## Meaning 
- an AI language model based on transformer architecture that is pre-trained, generative, unsupervised, and capable of performing well in zero/one/few-shot multitask settings. It predicts the next token




# Bark AI Model Can convert text to voice with no APIs ?

- So it's a Model that We can Do a ReSearch on How it works internally and just use it with our Project
- i saw the code and the implementation of it and it's so simple 
- it needs a 12gb memory so it works perfectly but it can be custolmizable to be used for ~ 2gb.

# Bark AI Model:

- Voice Cloning
- Text-Prompted Generative Audio
- Multilingual Voices
- Customizable Voices
- including music, background noise and simple sound effects.
- laughing, sighing and crying.
-  You can now use Bark with GPUs that have low VRAM (<4GB).


# Challenges:
- By default, generate_audio works well with around 13 seconds of spoken text. For an example of how to do long-form generation, see 👉 https://github.com/suno-ai/bark/blob/main/notebooks/long_form_generation.ipynb  👈
   - Solution: in short a for loop to map every sentence.
 

# IMPORTANT: 
- Do NOT use pip install bark. It installs a different package
   - use instade the github repo ```py pip install git+https://github.com/huggingface/transformers.git
 ```
-  save Voice as a .wav file using a third-party library, e.g. scipy:

# Resources:
- https://github.com/suno-ai/bark
- 