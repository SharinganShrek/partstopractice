# Drive Import

## Video linkleri (basit yol)

1. [`content/video-links.json`](video-links.json) dosyasına modül modül Drive video linklerini yapıştırın.
2. Çalıştırın:
   ```bash
   npm run apply:videos
   npm run merge:drive
   npm run seed:lms -- --reset
   ```

Her link **“Bağlantısı olan herkes görüntüleyebilir”** olmalı.

## Quiz'ler

1. Drive klasörünü [`content/drive-import/`](drive-import/) altına indirin.
2. `npm run parse:quizzes` :  `.docx` dosyalarından quiz JSON üretir.
3. `npm run seed:lms -- --reset`

## Tam import (ileri)

1. Download [Khan Academy Yaz Kampı Drive folder](https://drive.google.com/drive/folders/1nt8u6OOTNsEDiEMhQQZfGFGWDVr21QIK?usp=sharing) into `content/drive-import/`.
2. `npm run import:drive`
3. `content/drive-urls.csv` doldur (veya `video-links.json` kullan)
4. `npm run merge:drive` then `npm run seed:lms -- --reset`
