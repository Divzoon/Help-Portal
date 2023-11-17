import json
from difflib import get_close_matches


class KnowledgeBase:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = self.load()

    def load(self):
        try:
            with open(self.file_path, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Error: File '{self.file_path}' not found.")
            return {}

    def save(self):
        with open(self.file_path, 'w') as file:
            json.dump(self.data, file, indent=2)

    def get_questions(self):
        return [q["question"] for q in self.data.get("questions", [])]

    def get_answer(self, question):
        for q in self.data.get("questions", []):
            if q["question"].lower() == question.lower():
                return q["answer"]
        return None

    def add_question(self, question, answer):
        self.data.setdefault("questions", []).append({"question": question, "answer": answer})
        self.save()


class ChatBot:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base

    def find_best_match(self, user_question):
        close_matches = get_close_matches(user_question, self.knowledge_base.get_questions(), n=1, cutoff=0.8)
        return close_matches[0] if close_matches else None

    def get_answer_for_question(self, question):
        return self.knowledge_base.get_answer(question)

    def chat(self):
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


if __name__ == '__main__':
    knowledge_base = KnowledgeBase("knowledge_base.json")
    chat_bot = ChatBot(knowledge_base)
    chat_bot.chat()
