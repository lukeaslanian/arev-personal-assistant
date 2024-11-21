import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Chat from './components/Chat';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      priority
      dueDate
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!, $dueDate: String!) {
    addTask(title: $title, dueDate: $dueDate) {
      id
      title
      priority
      dueDate
    }
  }
`;

const NLU_RESPONSE = gql`
  query NLUResponse($question: String!, $context: String!) {
    nluResponse(question: $question, context: $context) {
      answer
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddTask = () => {
    addTask({ variables: { title: 'New Task', dueDate: '2023-12-31' } }).then(() => {
      refetch();
    });
  };

  const handleAskQuestion = async () => {
    const response = await client.query({
      query: NLU_RESPONSE,
      variables: { question, context },
    });
    setAnswer(response.data.nluResponse.answer);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks :(</p>;

  return (
    <div>
      <h1>Arev Personal Assistant</h1>
      <button onClick={handleAddTask}>Add Task</button>
      {data.tasks.map((task: any) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))}
      <div>
        <h2>Ask Arev a Question</h2>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <button onClick={handleAskQuestion}>Ask</button>
        {answer && <p>Answer: {answer}</p>}
      </div>
      <Chat />
    </div>
  );
};

export default App;
