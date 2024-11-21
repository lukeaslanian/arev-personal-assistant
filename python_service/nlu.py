from transformers import pipeline

nlp = pipeline('question-answering')

def get_answer(question, context):
    result = nlp(question=question, context=context)
    return result['answer']
