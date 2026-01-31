// export async function GET() {
//     return new Response('Hello Wold')
// }

import { movies } from "./db";

export async function GET() {
    return Response.json(movies)
}