import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const clienteId = params.clientId ?? '';

    try {

        const client = await db.select().from(Clients).where(eq(Clients.id, +clienteId));

        if (client.length > 0) {
            return new Response(
                JSON.stringify({
                    ...client,
                }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        return new Response(JSON.stringify({ msg: `Client with id #${clienteId} not found` }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ msg: `Error finding client ${clienteId}` }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export const PATCH: APIRoute = async ({ params, request }) => {

    const clienteId = params.clientId ?? '';

    try {

        const { id, ...body } = await request.json();
        const results = await db.update(Clients).set(body).where(eq(Clients.id, +clienteId));
        const updatedClient = await db.select().from(Clients).where(eq(Clients.id, +clienteId));

        return new Response(
            JSON.stringify({
                ...updatedClient,
            }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.log("ERROR => ", error);
        return new Response(JSON.stringify({ msg: 'Body not found' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export const DELETE: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? '';

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId));

    if (rowsAffected > 0) {
        return new Response(JSON.stringify({ msg: "Deleted" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return new Response(JSON.stringify({ msg: `Client with id #${clientId} not found` }), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
