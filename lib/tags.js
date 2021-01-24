import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://crm.daniel.nor.red',
    key: '7d8226c087fd97084e0c5c6b66',
    version: "v3"
});

export async function getTags() {
    return await api.tags.browse({include: "authors,count.posts"})
}

export async function getSingleTag(slug) {
    return await api.tags.read({slug: slug })
}
