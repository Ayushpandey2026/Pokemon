import { useEffect, useState } from "react";
import "./Pokemon.css"
import { PokemonCard } from "./PokemonCard";

export const Pokemon=()=>{
    const[pokemon,setPokemon]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[search,setSearch]=useState("");

    const API="https://pokeapi.co/api/v2/pokemon?limit=74";
    const fetchPokemon=async()=>{
        try{
           const res= await fetch(API);
             const data=  await res.json();
            //  console.log(data);
             
             const detaileddata=data.results.map(async(curPokemon)=>{
                const res=await fetch(curPokemon.url);
                const data=await res.json();
                return data;
             });
             const  detailedreponses=await Promise.all(detaileddata);
             console.log(detailedreponses);
             setPokemon(detailedreponses);
             setLoading(false);
             
        }

        catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
        
    };

    useEffect(()=>{
        fetchPokemon();
        
    },[]);

    const searchdata=pokemon.filter((curPokemon)=>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    
);
    return(
        <>
        <section className="container">
            <header>
                <h1>
                    Let's Catch them !
                </h1>
            </header>
           <div className="pokemon-search">
           <input type="text" placeholder="Search pokemon" value={search} onChange={(e)=>setSearch(e.target.value)} />
           </div>
            <div>
                <ul className="cards">
                    {searchdata.map((curPokemon)=>{
                        return(
                            <PokemonCard key={curPokemon.id} pokemondata={curPokemon}/>

                        );
                    })}
                </ul>
            </div>
        </section>
        </>
    )
}