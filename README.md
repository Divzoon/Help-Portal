# Help-Portal AI Documentation

## Overview
Our Help-Portal utilizes AI to generate documentation based on the provided company data. The AI model suggests topics for the documentation, enhancing the efficiency of the documentation process.

## Chatbot Type
The Help-Portal requires an information retrieval chatbot that fetches data from the documents available on the website. This approach helps to avoid hallucinations and improves the user experience by presenting information in a more engaging manner.

## AI Docs Helper
The AI Docs Helper takes the information from the documents and performs several operations on it:

- Summarization
- Explanation
- Reply Structure

## Documentation Structure
The documentation is structured as follows:

- Title
- Target audience
- Scope
- Sections
- Instructions for each section

## Example
Here's an example of how to create a document:

```markdown
# Title:
- How to use the new customer relationship management (CRM) software

# Target audience: 
- New users of the CRM software

# Scope:
-  The documentation should cover the basic features of the CRM software, such as how to add and manage contacts, create and manage deals, and track sales progress.

# Sections:

- Introduction
- Adding and managing contacts
- Creating and managing deals
- Tracking sales progress
- Conclusion
```


# Document Validation
To ensure that the API provides us with the full document data, we can add a special word at the end of the document. The AI is instructed to end the document with this special word. After the final version of the document is integrated, we can remove this special word.

# Example:

Request: Create a document that (...) and it must end with this special word at the end of the document (:$%end0fTHeD0c%$:)
App validation: If the response doesn't contain this special word, respond with (Continue). Else, respond with DONE_DOC_IS_FINISH.

# Important 
- Don't forget to add .env file that has ```OPENAI_API_KEY``` with your ChatGPT API 
- Our project utilizes gpt-3.5-turbo due to its cost-effectiveness and the fact that our project does not rely on conversational or streaming methodologies.
