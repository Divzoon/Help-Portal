import json
from difflib import get_close_matches


class KnowledgeBase:
    """
    A class used to represent Knowledge Base

    ...

    Attributes
    ----------
    file_path : str
        a formatted string to print out the file_path where the knowledge base is stored
    data : dict
        a dictionary holding the knowledge base data

    Methods
    -------
    load():
        Loads the knowledge base data from the file_path
    save():
        Saves the knowledge base data to the file_path
    get_questions():
        Returns a list of all questions in the knowledge base
    get_answer(question):
        Returns the answer for a given question in the knowledge base
    add_question(question, answer):
        Adds a question and its answer to the knowledge base
    """

    def __init__(self, file_path):
        """
        Constructs all the necessary attributes for the knowledge base object.

        Parameters
        ----------
            file_path : str
                file path where the knowledge base is stored
        """

        self.file_path = file_path
        self.data = self.load()

    def load(self):
        """
        Loads the knowledge base data from the file_path

        Returns
        -------
        dict
            a dictionary holding the knowledge base data
        """

        try:
            with open(self.file_path, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Error: File '{self.file_path}' not found.")
            return {}

    def save(self):
        """
        Saves the knowledge base data to the file_path
        """

        with open(self.file_path, 'w') as file:
            json.dump(self.data, file, indent=2)

    def get_questions(self):
        """
        Returns a list of all questions in the knowledge base

        Returns
        -------
        list
            a list of all questions in the knowledge base
        """

        return [q["question"] for q in self.data.get("questions", [])]

    def get_answer(self, question):
        """
        Returns the answer for a given question in the knowledge base

        Parameters
        ----------
        question : str
            a question to get the answer for

        Returns
        -------
        str
            the answer to the given question
        """

        for q in self.data.get("questions", []):
            if q["question"].lower() == question.lower():
                return q["answer"]
        return None

    def add_question(self, question, answer):
        """
        Adds a question and its answer to the knowledge base

        Parameters
        ----------
        question : str
            a question to add to the knowledge base
        answer : str
            the answer to the question
        """

        self.data.setdefault("questions", []).append({"question": question, "answer": answer})
        self.save()


class ChatBot:
    """
    A class used to represent a Chat Bot

    ...

    Attributes
    ----------
    knowledge_base : KnowledgeBase
        an object of KnowledgeBase class

    Methods
    -------
    find_best_match(user_question):
         Find the best match for a user's question in the knowledge base
    get_answer_for_question(question):
        Gets the answer for a given question from the knowledge base
    chat():
        Starts a chat with the user
    handle_edit_response(question):
        Handles the user's response to edit a question in the knowledge base
    """

    def __init__(self, knowledge_base):
        """
        Constructs all the necessary attributes for the chatbot object.

        Parameters
        ----------
            knowledge_base : KnowledgeBase
                an object of KnowledgeBase class
        """

        self.knowledge_base = knowledge_base

    def find_best_match(self, user_question):
        """
        Finds the best match for a user's question in the knowledge base

        Parameters
        ----------
        user_question : str
            a user's question

        Returns
        -------
        str
            the best match for the user's question
        """

        close_matches = get_close_matches(user_question, self.knowledge_base.get_questions(), n=1, cutoff=0.8)
        return close_matches[0] if close_matches else None

    def get_answer_for_question(self, question):
        """
        Gets the answer for a given question from the knowledge base

        Parameters
        ----------
        question : str
            a question to get the answer for

        Returns
        -------
        str
            the answer to the given question
        """

        return self.knowledge_base.get_answer(question)

    def chat(self):
        """
        Starts a chat with the user
        """

        while True:
            user_input = input("Enter your question: ").strip()
            if user_input.lower() == "exit":
                break

            best_match = self.find_best_match(user_input)

            if best_match:
                answer = self.get_answer_for_question(best_match)
                if answer:
                    print(f'Answer: {answer}')
                    self.handle_edit_response(best_match)
                else:
                    print('bot: Sorry, I don\'t know the answer to this question.')
            else:
                print('bot: Sorry, I couldn\'t find a match for your question. Do you know the answer?')
                new_answer = input('Enter the answer to this question or "skip" to skip: ').strip()

                if new_answer.lower() != 'skip':
                    self.knowledge_base.add_question(user_input, new_answer)
                    print('bot: Thank you, I will remember this answer.')

    def handle_edit_response(self, question):
        """
        Handles the user's response to edit a question in the knowledge base

        Parameters
        ----------
        question : str
            a question to edit in the knowledge base
        """

        edit_response = input('Do you want to edit the response? (yes/no): ').lower()
        if edit_response == 'yes':
            new_answer = input('Enter the edited response: ')
            print(f'Edited Response: {new_answer}')
            self.knowledge_base.add_question(question, new_answer)
            print('bot: Edited response saved.')
        elif edit_response == 'no':
            print('bot: Okay, I will not remember this answer.')
        else:
            print('bot: Invalid response. Please enter "yes" or "no".')
            self.handle_edit_response(question)


if __name__ == '__main__':
    knowledge_base = KnowledgeBase("knowledge_base.json")
    chat_bot = ChatBot(knowledge_base)
    chat_bot.chat()
