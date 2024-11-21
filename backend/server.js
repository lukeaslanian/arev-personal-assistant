const { ApolloServer, gql } = require('apollo-server');
const { getTasks, addTask } = require('./taskController');
const { getNLUResponse } = require('./nluController');

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    priority: Int!
    dueDate: String!
  }

  type NLUResponse {
    answer: String!
  }

  type Query {
    tasks: [Task]
    nluResponse(question: String!, context: String!): NLUResponse
  }

  type Mutation {
    addTask(title: String!, dueDate: String!): Task
  }
`;

const resolvers = {
  Query: {
    tasks: () => getTasks(),
    nluResponse: (_, { question, context }) => getNLUResponse(question, context),
  },
  Mutation: {
    addTask: (_, { title, dueDate }) => addTask(title, dueDate),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // Adjust as needed
    credentials: true,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Arev Backend Server ready at ${url}`);
});
