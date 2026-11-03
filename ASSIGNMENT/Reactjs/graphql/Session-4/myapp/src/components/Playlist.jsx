import React from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";


const GET_SONGS = gql`query GetSongs { songs { id title artist } }`;
const ADD_SONG = gql`mutation AddSong($title:String!,$artist:String!){ addSong(title:$title,artist:$artist){ id title artist } }`;
const UPDATE_SONG = gql`mutation UpdateSong($id:ID!,$title:String!){ updateSong(id:$id,title:$title){ id title artist } }`;
const DELETE_SONG = gql`mutation DeleteSong($id:ID!){ deleteSong(id:$id) }`;

export default function Playlist(){
  const {data,loading,error} = useQuery(GET_SONGS);
  const [title,setTitle]=useState(""); const [artist,setArtist]=useState("");
  const [editId,setEditId]=useState(null); const [editTitle,setEditTitle]=useState("");
  const [addSong,{loading:adding}]=useMutation(ADD_SONG,{
    optimisticResponse: { addSong: { __typename:"Song", id:`temp-${Date.now()}`, title, artist } },
    update(cache,{data}){
      const added=data?.addSong; if(!added) return;
      const current=cache.readQuery({query:GET_SONGS});
      if(current) cache.writeQuery({query:GET_SONGS,data:{songs:[...current.songs.filter(s=>s.id!==added.id),added]}});
    }
  });
  const [updateSong]=useMutation(UPDATE_SONG);
  const [deleteSong]=useMutation(DELETE_SONG,{
    update(cache,{data}, {variables}){
      if(data?.deleteSong){
        const current=cache.readQuery({query:GET_SONGS});
        if(current) cache.writeQuery({query:GET_SONGS,data:{songs:current.songs.filter(s=>s.id!==variables.id)}});
      }
    }
  });
  if(loading) return <p>Loading playlist…</p>;
  if(error) return <p role="alert">GraphQL error: {error.message}</p>;
  const songs=data?.songs ?? [];
  async function submit(e){e.preventDefault(); if(!title.trim()||!artist.trim())return;
    try{await addSong({variables:{title:title.trim(),artist:artist.trim()}});setTitle("");setArtist("");}catch(e){console.error(e);}
  }
  async function save(id){if(!editTitle.trim())return;try{await updateSong({variables:{id,title:editTitle.trim()},optimisticResponse:{updateSong:{__typename:"Song",id,title:editTitle.trim(),artist:songs.find(s=>s.id===id)?.artist ?? ""}}});setEditId(null);}catch(e){console.error(e);}}
  async function remove(id){try{await deleteSong({variables:{id}});}catch(e){console.error(e);}}
  return <section><h1>My Playlist</h1><form onSubmit={submit} className="form">
    <input placeholder="Song title" value={title} onChange={e=>setTitle(e.target.value)} required/>
    <input placeholder="Artist" value={artist} onChange={e=>setArtist(e.target.value)} required/>
    <button disabled={adding}>{adding?"Adding…":"Add song"}</button></form>
    <h2>Total songs: {songs.length}</h2>
    {songs.map(song=><article key={song.id}><div>{editId===song.id?<><input value={editTitle} onChange={e=>setEditTitle(e.target.value)}/><button onClick={()=>save(song.id)}>Save</button><button className="secondary" onClick={()=>setEditId(null)}>Cancel</button></>:<><strong>{song.title}</strong><span> — {song.artist}</span><button className="secondary" onClick={()=>{setEditId(song.id);setEditTitle(song.title)}}>Edit</button></>}</div><button className="danger" onClick={()=>remove(song.id)}>Delete</button></article>)}
    {!songs.length&&<p>Your playlist is empty. Add your first song!</p>}
  </section>;
}
