export const PokemonCard=({pokemondata})=>{
    return(
        <li className="pokemon-card">
            <figure>
                <img src={pokemondata.sprites.other.dream_world.front_default}
                 alt={pokemondata.name} 
                 className="pokemon-image"
                 />
            </figure>
            <h1 className="pokemon-name">{pokemondata.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {pokemondata.types.map((curtype)=>curtype.type.name).join(", ")}
                </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Height:</span>{pokemondata.height}
                </p>
                <p className="pokemon-info">
                    <span>Weight:</span> {pokemondata.weight}
                </p>
                <p className="pokemon-info">
                    <span>Speed:</span>{pokemondata.stats[5].base_stat}
                </p>
            </div>
        </li>
    )
};