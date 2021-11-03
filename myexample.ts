import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type PlantsFamily {
      id: Int,
      name: String
  }

  type Query {
    families: [PlantsFamily]
    family(id: Int!): PlantsFamily
  }
`);

const families =  [
    { id: 1, name: 'Amaryllidaceae'},
    { id: 2, name: 'Liliaceae'},
    { id: 3, name: 'Iridaceae'},
    { id: 4, name: 'Papaveraceae'},
];

// The root provides a resolver function for each API endpoint
const rootValue = {
  families: () =>  families,
  family: (args: any) => families.find(family => family.id === args.id) 
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: { headerEditorEnabled: true },
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');