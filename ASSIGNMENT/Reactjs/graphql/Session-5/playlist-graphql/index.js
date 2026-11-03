import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "node:fs/promises";

const typeDefs = await readFile(new URL("./schema.graphql", import.meta.url), "utf8");
const playlists = [
  { id:"p1", name:"Chill Mix", songIds:["s1","s2"] },
  { id:"p2", name:"Workout", songIds:["s2","s3"] }
];
const songs = [
  { id:"s1", title:"Perfect", artist:"Ed Sheeran", duration:263 },
  { id:"s2", title:"Blinding Lights", artist:"The Weeknd", duration:200 },
  { id:"s3", title:"Levitating", artist:"Dua Lipa", duration:203 }
];
const resolvers = {
  Query: {
    playlists: () => playlists,
    playlist: (_, {id}) => playlists.find(p=>p.id===id) ?? null,
    songs: () => songs
  },
  Playlist: { songs: playlist => playlist.songIds.map(id=>songs.find(s=>s.id===id)) }
};
const server = new ApolloServer({typeDefs,resolvers});
const {url} = await startStandaloneServer(server,{listen:{port:4001}});
console.log(`GraphQL server ready at ${url}`);
