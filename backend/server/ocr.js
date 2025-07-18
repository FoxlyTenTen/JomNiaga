// backend/ocr.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handle base64 images
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/ocr', async (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const geminiImage = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const prompt = `Extract this Malaysian IC information into strict JSON:
{
  "ic_number": "",
  "full_name": "",
  "address_1": "",
  "address_2": "",
  "postcode": "",
  "city": "",
  "state": "",
  "religion": "",
  "gender": "",
  "nationality": ""
}
Only return JSON, no explanation.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }, geminiImage] }]
    });

    const text = await result.response.text();
    const cleanedText = text.replace(/```json|```/g, '').trim();

    const extractedJSON = JSON.parse(cleanedText);

    res.json(extractedJSON);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OCR failed", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`OCR API running at http://localhost:${port}`);
});
