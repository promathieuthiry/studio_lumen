import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    token: process.env.SANITY_API_WRITE_TOKEN,
  }),
});
