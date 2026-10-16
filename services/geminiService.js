const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateReview = async (
  websiteName,
  websiteUrl,
  websiteDescription
) => {

  const prompt = `
Analyze this website and generate a professional review.

Website Name: ${websiteName}

Website URL: ${websiteUrl}

Description:
${websiteDescription}

Generate:

1. Overview
2. Strengths
3. Weaknesses
4. Suggestions
5. Security Notes
6. Overall Rating out of 10
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

module.exports = generateReview;