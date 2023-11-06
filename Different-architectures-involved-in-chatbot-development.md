# Different architectures involved in chatbot development

## Pattern-based approach

It also called rule-based chatbot. It is the simplest approach to build a chatbot. It is based on a set of predefined rules. The bot is trained to respond to specific patterns in the user input, and it replies with a predefined answer. The pattern matching is less concerned with the semantics of the input but more focused on being conversational.

### How does it work?

1. The user enters a text message.
2. The message is goes through all the user defined patterns until it finds the pattern that matches the user input.
3. Once the pattern is matched, the chatbot uses the correct response template to generate a response.
4. The response is sent to the user.

### Note

1. The challange with this approach is that the patterns should be defined manually and it is difficult to task to define all the possible patterns.
2. It is not scalable and it is difficult to maintain as the number of patterns increases with the complexity of the chatbot.

## Intent classification approach

This technique powerd by machine learning and natural language processing.

### Key concepts

- Natural language Understanding (NLU)
- Intent classification
- Entity recognition
- Dialog management
