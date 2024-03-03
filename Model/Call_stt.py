from Model_speech_to_text import pipe
import librosa
# Load your own audio file
audio_path = "./Audio/เสียง_ 004.wav"

# Load the audio and its sampling rate
audio_array, sampling_rate = librosa.load(audio_path, sr=16000, mono=True)

# Transcribe the audio
result = pipe({"raw": audio_array, "sampling_rate": sampling_rate})

# Print the transcribed text
print("Transcribed text:", result["text"])