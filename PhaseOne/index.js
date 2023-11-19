import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CompanyInfo = {
  companyName: "OpenAI",
  companyDescription:
    "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
  department: "AI Software",
  location: "San Francisco, CA",
};

const getTitles = () => {
  const prompt = `Generate 10 titles for documentation blog posts about "${CompanyInfo.companyName}'s help portal". Each title should be concise, informative, and relevant  to the company's work in the ${CompanyInfo.department} department and its location in ${CompanyInfo.location}. The company description is: ${CompanyInfo.companyDescription}. Please format the titles as a JSON object with a "titles" array.`;

  return prompt;
};

const getDocumentPrompt = (title, companyInfo) => {
  return `Generate a document discussing "${title}", related to the work of ${companyInfo.companyName} in the ${companyInfo.department} department and its location in ${companyInfo.location}. The company description is: ${companyInfo.companyDescription}.`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cache = {}; // Initialize an empty cache object

async function main() {
    console.log("Generating documents...");
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: getTitles() }],
    model: "gpt-3.5-turbo",
  });
  const titles = JSON.parse(chatCompletion.choices[0].message.content).titles;
console.log("Titles are generated");
  let fullDocument = "";

  for (const title of titles) {
    console.log("Generating document number: ", title);
    const cachedDocument = cache[title]; // Check if the document is already cached

    if (!cachedDocument) {
      const prompt = getDocumentPrompt(title, CompanyInfo);
      const documentCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const document = documentCompletion.choices[0].message.content;

      fullDocument += document;
      cache[title] = document; // Store generated document in the cache
    } else {
      fullDocument += cachedDocument; // Use cached document if available
    }
console.log("Document number: ", title,"is generated");
    // Delay for 1 second before the next API call
    await delay(1000);
  }

  console.log(fullDocument);
}

main();
