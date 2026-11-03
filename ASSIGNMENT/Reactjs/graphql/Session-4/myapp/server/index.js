import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

const typeDefs = `#graphql
  type Song { id: ID!, title: String!, artist: String! }
  type Query { songs: [Song!]! }
  type Mutation {
    addSong(title: String!, artist: String!): Song!
    updateSong(id: ID!, title: String!): Song!
    deleteSong(id: ID!): Boolean!
  }
`;
let songs = [
  { id: "1", title: "Perfect", artist: "Ed Sheeran" },
  { id: "2", title: "Blinding Lights", artist: "The Weeknd" }
];
const resolvers = {
  Query: { songs: () => songs },
  Mutation: {
    addSong: (_, { title, artist }) => {
      const song = { id: String(Date.now()), title, artist };
      songs = [...songs, song]; return song;
    },
    updateSong: (_, { id, title }) => {
      const song = songs.find(s => s.id === id);
      if (!song) throw new Error("Song not found");
      song.title = title; return song;
    },
    deleteSong: (_, { id }) => {
      const before = songs.length; songs = songs.filter(s => s.id !== id);
      return songs.length < before;
    }
  }
};
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
app.use("/graphql", cors(), express.json(), expressMiddleware(server));
app.listen(4000, () => console.log("GraphQL API: http://localhost:4000/graphql"));
