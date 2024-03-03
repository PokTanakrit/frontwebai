from pydub import AudioSegment

def convert_m4a_to_wav(m4a_file, wav_file):
    # Load the M4A file
    audio = AudioSegment.from_file(m4a_file, format="m4a")

    # Export the audio to WAV format
    audio.export(wav_file, format="wav")

# Example usage
m4a_file = r"Audio\เสียง2.m4a"
wav_file = r"Audio\เสียง2.m4a.wav"
convert_m4a_to_wav(m4a_file, wav_file)
