import os
import requests
import base64

# ระบุตำแหน่งโฟลเดอร์ที่เก็บไฟล์ audio
audio_folder = "src/Model/Audio"

# วนลูปผ่านไฟล์ทั้งหมดในโฟลเดอร์ audio
for idx, filename in enumerate(os.listdir(audio_folder), start=1):
    if filename.endswith(".wav"):  # ตรวจสอบนามสกุลไฟล์เป็น .wav เท่านั้น
        file_path = os.path.join(audio_folder, filename)
        
        # อ่านข้อมูลไฟล์ audio และเข้ารหัสเป็น base64
        with open(file_path, "rb") as audio_file:
            audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")

        # กำหนดคีย์เป็นลำดับของไฟล์
        key = str(idx)

        # ตรวจสอบว่าสามารถส่ง POST request ไปยังเซิร์ฟเวอร์ได้หรือไม่
        try:
            # เตรียม payload
            payload = {'audioBase64': audio_base64, 'key': key}
            
            # ส่ง POST request ไปยังเซิร์ฟเวอร์
            response = requests.post("http://127.0.0.1:5000/audioques", json=payload)

            # ตรวจสอบสถานะการร้องขอ
            if response.status_code == 200:
                print(f'POST request for {filename} succeeded.')
            else:
                print(f'Error: {response.status_code} for {filename}')
        except Exception as e:
            print(f'Error: {e} for {filename}')
