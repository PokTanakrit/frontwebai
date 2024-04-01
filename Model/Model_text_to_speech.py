from transformers import VitsModel, AutoTokenizer
import torch

# Define function to convert text to audio waveform
def text_to_audio_array(text):
    try:
        model = VitsModel.from_pretrained("modeltts")
        tokenizer = AutoTokenizer.from_pretrained("modeltts")
        inputs = tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            output = model(**inputs).waveform
        audio_waveform = output.cpu().numpy()
        return audio_waveform
    except Exception as e:
        return str(e)


