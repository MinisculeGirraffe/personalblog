import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://pwsh.rest',
    key: '5b0330ac787b7785e79e33bfd3',
    version: "v3"
});

export async function getTags() {
    return await api.tags.browse({include: "authors,count.posts"})
}

export async function getSingleTag(slug) {
    return await api.tags.read({slug: slug })
}
