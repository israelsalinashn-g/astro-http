import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts, eq } from "astro:db";

export const getPostLikes = defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {
        const posts = await db.select().from(Posts).where(eq(Posts.id, postId))

        // call a mailing service, or store to a database
        return { likes: posts.at(0)?.likes ?? 0 };
    },
});