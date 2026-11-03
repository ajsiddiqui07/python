import { buildSchema, graphql } from 'graphql';

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
  }
  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`);

const posts = [
  { id:'1', title:'Building Better Communities', content:'A sample post about local communities and shared spaces.', author:'Aarav', createdAt:'2026-11-01T10:00:00Z' },
  { id:'2', title:'Technology in Everyday Life', content:'A sample post about how technology changes daily routines.', author:'Maya', createdAt:'2026-11-01T11:00:00Z' },
  { id:'3', title:'Simple Healthy Habits', content:'A sample post about small habits that support wellbeing.', author:'Riya', createdAt:'2026-11-01T12:00:00Z' }
];

const rootValue = {
  posts: () => posts,
  post: ({ id }) => posts.find(post => post.id === id) || null
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST with a GraphQL query.' });
  const { query, variables, operationName } = req.body || {};
  if (!query) return res.status(400).json({ errors: [{ message: 'GraphQL query is required.' }] });
  const result = await graphql({ schema, source: query, rootValue, variableValues: variables, operationName });
  return res.status(200).json(result);
}
