from Model_text_to_speech import processor,model
# Thai text input
thai_text = "อาการเป็นยังไง"

# Convert Thai text to Thai speech
text_inputs = processor(text=thai_text, src_lang="tha", return_tensors="pt")
audio_array_from_text = model.generate(**text_inputs, tgt_lang="tha")[0].cpu().numpy().squeeze()

import torch
import torchaudio
from IPython.display import Audio

# Load the audio data into a torch tensor
audio_tensor = torch.tensor(audio_array_from_text)

# Specify the sampling rate (16 kHz in this case)
sampling_rate = 16000

# Play the audio
Audio(data=audio_tensor.numpy(), rate=sampling_rate)

import torchaudio
import torch
from scipy.io.wavfile import write
# Assuming audio_tensor contains your audio data as a Torch tensor
audio_tensor = torch.tensor(audio_array_from_text)
# Convert the audio tensor to a NumPy array
audio_np = audio_tensor.numpy()
# Specify the file path to save the WAV file
wav_file_path = "./Audio/audio2.wav"
# Specify the sampling rate (e.g., 18000 Hz)
sampling_rate = 18000
# Save the audio to a WAV file
write(wav_file_path, sampling_rate, audio_np)