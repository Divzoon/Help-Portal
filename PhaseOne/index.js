import dotenv from 'dotenv';
import OpenAI from 'openai';
import ora from 'ora';


const MongoWrite = (title, document) => {
    const uri = process.env.MONGO_DB_URI;

    // Create an ora spinner
    const spinner = ora('Connecting to MongoDB...').start();
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    client.connect(err => {
        if (err) {
            spinner.fail('Failed to connect to MongoDB');
            console.error(err);
            return;
        }
    
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
    
        // Stop the spinner and indicate successful connection
        spinner.succeed('Connected to MongoDB');
    
        // Close the MongoDB connection
        client.close();
    
        // Save documents to a JSON file
        const fs = require('fs');
        fs.writeFile('documents.json', JSON.stringify(documents), (err) => {
            if (err) throw err;
            console.log('Documents saved to documents.json');
        });
    });

}














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
  return `Generate a document discussing "${title}", related to the work of ${companyInfo.companyName} in the ${companyInfo.department} department and its location in ${CompanyInfo.location}. The company description is: ${CompanyInfo.companyDescription}.`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cache = {}; // Initialize an empty cache object

const spinner = ora('Generating documents...');
spinner.start();

async function main() {
  // Generate document titles
  const titlesSpinner = spinner.info('Generating document titles...');
  const titles = await getTitles();
  titlesSpinner.succeed();

  // Generate documents
  const documentsSpinner = spinner.info('Generating documents...');
  let fullDocument = "";
  for (const title of titles) {
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
  }
  documentsSpinner.succeed();

  spinner.succeed('Documents generated successfully!');


    // Write documents to MongoDB
    const mongoSpinner = ora('Writing documents to MongoDB...').start();
    MongoWrite(titles, fullDocument);

    // Stop the spinner and indicate successful connection
    mongoSpinner.succeed('Documents written to MongoDB');

}

main();
