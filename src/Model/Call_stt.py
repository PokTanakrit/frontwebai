from Model_speech_to_text import pipe
import librosa


def audio_to_text(audio_path):
    # Load the audio file
    audio_array, sampling_rate = librosa.load(audio_path, sr=16000, mono=True)

    # Transcribe the audio
    result = pipe({"raw": audio_array, "sampling_rate": sampling_rate})

    # Extract the transcribed text
    transcribed_text = result["text"]

    return transcribed_text
