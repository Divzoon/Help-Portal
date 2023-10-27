# Build an Information rettrieval enteractive chatbot

## Introduction

This project is a chatbot that can answer questions about the content of a given dataset and Data that provided by customer representative. The Data is in the form of a text file that contains the questions and answers, and Documentation.

## Types of chatbots

There are two types of chatbots:

1. **Rule-Based approach**: This approach is based on if-else conditions. It is a simple approach but it is not scalable. It is not able to handle complex queries.

2. **Self learning approach**: This approach is based on machine learning algorithms. It is a complex approach but it is scalable. It is able to handle complex queries.

   - **Generative chatbots**: These chatbots are based on sequence-to-sequence (seq2seq) neural networks.
     - They are able to generate new responses from scratch.
     - They are not able to remember the context of the conversation.

   - **Retrieval-based chatbots**: These chatbots are based on retrieving the best response from a list of responses.
     - They are able to remember the context of the conversation.
     - They are not able to generate new responses from scratch.

## Key Features of the retrieval-based chatbot

- **Knowledge Base**: These chatbots use various matching algorithms to find the best response from the knowledge base. Common matching algorithms are TF-IDF (Term Frequency-Inverse Document Frequency), Cosine Similarity, Word2Vec, etc.

- **Accuracy**: Retrieval-based chatbots are known for their accuracy in providing responses, especially in scenarios where the responses are well-defined and specific, such as customer support or information retrieval.

- **Limited Creativity**: Unlike generative chatbots, retrieval-based chatbots do not generate novel responses. They rely on pre-existing answers, making them suitable for tasks where accuracy is more critical than creativity.

