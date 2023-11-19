import dotenv from 'dotenv';
import OpenAI from 'openai';
import ora from 'ora';
const MongoClient = require('mongodb').MongoClient;
const ora = require('ora');
const fs = require('fs/promises'); // Use fs.promises for async file operations


const connectToMongoDB = async (uri) => {
    const spinner = ora('Connecting to MongoDB...').start();
    
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        spinner.succeed('Connected to MongoDB');
        return client;
    } catch (error) {
        spinner.fail('Failed to connect to MongoDB');
        console.error(error);
        throw error;
    }
};


const MongoWrite = async (data, collectionName = 'documents') => {
    try {
        const uri = process.env.MONGO_DB_URI;
        const client = await connectToMongoDB(uri);

        const collection = client.db("AIDocsGenerator").collection(collectionName);

        // Save all documents to MongoDB
        await collection.insertMany(data);
        console.log('Documents saved to MongoDB');

    } finally {
        // Close the MongoDB connection in a finally block to ensure it's closed even if an error occurs
        if (client) {
            await client.close();
        }
    }
};












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

//restructure the Data as a JSON object with a "titles" array and a "document" string
//example: { "title1": {Document1:"Document1 details",},
//           "title2": {Document2:"Document2 details",},



const TITLES = titles;
const DOCUMENTS = documents;

const data = TITLES.map((title, index) => ({
    title,
    document: DOCUMENTS[index]
}));







    // Write documents to MongoDB
    const mongoSpinner = ora('Writing documents to MongoDB...').start();
    try {
      // Save documents to MongoDB the data object
        await MongoWrite(data);
        mongoSpinner.succeed('Documents written to MongoDB');

    } catch (error) {
        mongoSpinner.fail('Failed to write documents to MongoDB');
        console.error(error);
        throw error;
    }


}

main();
