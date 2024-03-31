import torch
from transformers import pipeline
import librosa
import numpy as np
import requests

# MODEL_NAME = "biodatlab/whisper-th-medium-combined"
# lang = "th"

# device = 0 if torch.cuda.is_available() else "cpu"

# pipe = pipeline(
#     task="automatic-speech-recognition",
#     model=MODEL_NAME,
#     chunk_length_s=30,
#     device=device,
# )

def transcribe_audio_from_server(audio_data):
    try:
        MODEL_NAME = "biodatlab/whisper-th-medium-combined"
        device = 0 if torch.cuda.is_available() else "cpu"

        pipe = pipeline(
            task="automatic-speech-recognition",
            model=MODEL_NAME,
            chunk_length_s=30,
            device=device,
        )

        # แปลงเสียงให้เป็นข้อความ
        transcriptions = pipe(
            np.array(audio_data),
            batch_size=16,
            return_timestamps=False,
            generate_kwargs={"language": "thai", "task": "transcribe"}
        )["text"]

        return transcriptions
    except Exception as e:
        return str(e)