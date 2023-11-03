// use chatGPT to get documentation blog titles and descriptions as a JSON formate 
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

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

//   console.log(chatCompletion.choices);
//   console.log( JSON.parse(chatCompletion.choices[0].message.content));
// to get the response 
console.log( chatCompletion.choices[0].message.content);
const titles = chatCompletion.choices[0].message.content;
}

main();
