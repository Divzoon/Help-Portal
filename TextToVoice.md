## AI Text-To-Voice Models

| Model | Type | Notable Features |
|---|---|---|
| AudioLM | GPT-style | Semantic and acoustic tokens |
| Bark | GPT-style | Encoder-decoder architecture |
| Vall-E | Fully generative | Encodec architecture |

### GPT-style models

**Meaning:** AI language models based on transformer architecture that are pre-trained, generative, unsupervised, and capable of performing well in zero/one/few-shot multitask settings. They predict the next token.

### Important blog to read

* [A Deep Dive Into GPT Models](https://www.kdnuggets.com/2023/05/deep-dive-gpt-models.html)

### Bark AI Model

#### Can Bark AI Model convert text to voice with no APIs?

Yes, Bark AI Model can convert text to voice with no APIs. It is a model that can be used for research on how it works internally and can be used with any project. It needs 12GB of memory to work perfectly, but it can be customized to be used with as little as 2GB of memory.

#### Bark AI Model features

* Voice cloning
* Text-prompted generative audio
* Multilingual voices
* Customizable voices
* Music, background noise, and simple sound effects
* Laughing, sighing, and crying
* Support for GPUs with low VRAM (<4GB)

#### Challenges

* By default, `generate_audio()` works well with around 13 seconds of spoken text. For long-form generation, see the github notebook: [https://github.com/suno-ai/bark/blob/main/notebooks/long_form_generation.ipynb](https://github.com/suno-ai/bark/blob/main/notebooks/long_form_generation.ipynb).
* Solution: Use a for loop to map every sentence.

#### Important

* Do NOT use `pip install bark`. It installs a different package.
* Instead, use the GitHub repo: `pip install git+https://github.com/huggingface/transformers.git`
* To save the voice as a .wav file, use a third-party library such as scipy.

### Resources

* Bark AI Model GitHub repo: [https://github.com/suno-ai/bark](https://github.com/suno-ai/bark)
