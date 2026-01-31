import { movies } from "../db";

export async function GET(_req: Request,{params} : {params: {id: string}}) {
    const {id} = await params;

    const movie = movies.find(m => m.id === +id);

    return movie ? new Response(JSON.stringify(movie)) : new Response("Movie not found", {status: 404})
}

export async function PATCH(req: Request, {params}: {params: {id: string}}) {
    const {id} = await params;
    const movieId = +id;

    const movie = movies.find((m) => m.id === movieId);

    if(!movie) {
        return new Response(JSON.stringify({error: 'Movie Not Found :('}), {status: 404})
    }

    try {
        const updatedMovie = await req.json();

        const index = movies.findIndex(m => m.id === movieId)

        if(!movie) {
            return new Response(JSON.stringify({error: 'Movie Not Found :('}), {status: 404})
        }

        // Update the movei
        movies[index] = {...movie, ...updatedMovie}

        return new Response(JSON.stringify(movies[index]), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: 'Failed to parse JSON'}), {status: 404})
    }
}

export async function DELETE(_req: Request, {params}: {params: {id: string}}) {
    const {id} = await params;
    const movieId = +id;

    // Find the movie index
    const index = movies.findIndex(m => m.id === movieId)

    if(index === -1) {
        return new Response(JSON.stringify({error: 'Movie not found'}), {status: 404})
    }

    movies.splice(index, 1)

    return new Response(JSON.stringify({message: 'Movie deleted successfully'}), {status: 200})
}