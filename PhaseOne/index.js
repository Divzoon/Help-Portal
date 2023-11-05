import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const openai = new OpenAI({
  apiKey:  process.env.OPENAI_API_KEY,
});

const getPrompt = () => {
    const CompanyInfo = {
        companyName: "OpenAI",
        companyDescription:
            "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
        department: "AI Software",
        location: "San Francisco, CA",
    };

    const prompt =`Generate 10 titles for documentation blog posts about "${CompanyInfo.companyName}'s help portal". Each title should be related to the company's work in the ${CompanyInfo.department} department and its location in ${CompanyInfo.location}. The company description is: ${CompanyInfo.companyDescription}. Please format the titles as a JSON object with a "titles" array.`

    return prompt;
};

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: getPrompt()}],
    model: 'gpt-3.5-turbo',
  });
const titles = chatCompletion.choices[0].message.content;
}

main();
