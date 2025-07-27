import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const { givenText } = await req.json();

    if (!givenText) {
      return NextResponse.json({ error: 'Missing givenText input.' }, { status: 400 });
    }

    const prompt = `Generate 10 multiple-choice questions designed to build excitement and curiosity in travelers about an upcoming trip. Each question should be related to the trip experience and help the traveler learn more about the destination.

Format the output as a valid JSON array.

Each object should have:

"question": the question string.

"options": an array of 4 possible answers.

"answer": a key from the ${givenText} that correctly corresponds to the question.

Use only content from ${givenText} to form answers.

Do not include any explanations, descriptions, or additional text—only return the raw JSON.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      }
    );

    const data = await response.json();

    let jsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!jsonString) {
      return NextResponse.json({ error: 'No response from Gemini.' }, { status: 500 });
    }

    if (jsonString.startsWith('```json')) jsonString = jsonString.substring(7).trimStart();
    if (jsonString.endsWith('```')) jsonString = jsonString.slice(0, -3).trimEnd();

    try {
      const parsedJSON = JSON.parse(jsonString);
      return NextResponse.json(parsedJSON);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return NextResponse.json({ error: 'Failed to parse JSON from Gemini output.' }, { status: 500 });
    }

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
