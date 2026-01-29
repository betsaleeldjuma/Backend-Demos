import { movies } from "../db";

export async function GET(_req: Request, {params}: {params: {id: string}}) {
    const {id} = await params;

    const movie = movies.find((movie) => movie.id === +id);

    return movie ? new Response(JSON.stringify(movie)) : new Response('Movie not found', {status: 404})
}

export async function PATCH(req: Request, {params}: {params: {id: string}}) {
    const {id} = await params;
    const movie = movies.find(movie => movie.id === +id);

    if(!movie) return new Response('Movie not found', {status: 404});

    const body = await req.json();

    const updatedTitle = body.title ? {movie.name = body.title} : movie.name;
}