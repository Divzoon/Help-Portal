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
    get_questions():
        Returns a list of all questions in the knowledge base
    get_answer(question):
        Returns the answer for a given question in the knowledge base
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
    """

    def __init__(self, knowledge_base):
        """
        Constructs all the necessary attributes for the chat bot object.

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

        close_matches = get_close_matches(user_question, self.knowledge_base.get_questions(), n=2, cutoff=0.5)
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
                else:
                    print('bot: Sorry, I don\'t know the answer to this question.')
            else:
                print('bot: Sorry, I couldn\'t find a match for your question. Do you know the answer?')


if __name__ == '__main__':
    knowledge_base = KnowledgeBase("knowledge_base.json")
    chat_bot = ChatBot(knowledge_base)
    chat_bot.chat()
