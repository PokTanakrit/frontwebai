# import requests
# import base64
# import io
# import sounddevice as sd
# import numpy as np

# url = 'http://localhost:5000/data'

# try:
#     response = requests.get(url)
#     if response.status_code == 200:
#         data = response.json()
#         audiodata = data['audio']['audio1']
#         print(audiodata)
#         # Decode base64 data
#         audio_bytes = base64.b64decode(audiodata)
#         # Convert bytes to numpy array
#         audio_array = np.frombuffer(audio_bytes, dtype=np.int16)
#         # Play audio
#         sd.play(audio_array, samplerate=44100)
#         sd.wait()
#     else:
#         print(f'Error: {response.status_code}')
# except Exception as e:
#     print(f'Error: {e}')

# from Model_speech_to_text import pipe
# import librosa


# def audio_to_text(audio_path):
#     # Load the audio file
#     audio_array, sampling_rate = librosa.load(audio_path, sr=16000, mono=True)

#     # Transcribe the audio
#     result = pipe({"raw": audio_array, "sampling_rate": sampling_rate})

#     # Extract the transcribed text
#     transcribed_text = result["text"]

#     return transcribed_text




