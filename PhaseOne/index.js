import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const openai = new OpenAI({
  apiKey:  process.env.OPENAI_API_KEY,
});
    const CompanyInfo = {
        companyName: "OpenAI",
        companyDescription:
            "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
        department: "AI Software",
        location: "San Francisco, CA",
    };
const getTitles = () => {


    const prompt =`Generate 10 titles for documentation blog posts about "${CompanyInfo.companyName}'s help portal". Each title should be related to the company's work in the ${CompanyInfo.department} department and its location in ${CompanyInfo.location}. The company description is: ${CompanyInfo.companyDescription}. Please format the titles as a JSON object with a "titles" array.`

    return prompt;
};


// const GetDocPromptsArray = (titles) =>{
//  let arr =[]
//   titles.map((title,index)=>{
// if(CompanyInfo.department = "Development & Software"){
//   const DocPrompt= `Generate a document md file structured that talk about ${CompanyInfo.department} that have a title of ${title} make sure that the title has a sub titles and section and conclusion also and make sure to include examples and code if needed `
//  arr.push(DocPrompt)
// }else{
//   const DocPrompt= `Generate a document md file structured that talk about ${CompanyInfo.department} that have a title of ${title} make sure that the title has a sub titles and section and conclusion also `
//   arr.push(DocPrompt)

// }


//   })

//   return arr

// }

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: getTitles()}],
    model: 'gpt-3.5-turbo',
  });
const titles = chatCompletion.choices[0].message.content;

// const chatCompletion2 = await openai.chat.completions.create({
//   messages: [{ role: 'user', content: GetDocPromptsArray(titles)}],
//   model: 'gpt-3.5-turbo',
// });


}

main();
