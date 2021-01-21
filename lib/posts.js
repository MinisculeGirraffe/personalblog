import GhostContentAPI from "@tryghost/content-api";
const api = new GhostContentAPI({
    url: 'https://danielnorred.ghost.io',
    key: 'f9c174e0deefd659b2634d134c',
    version: "v3"
});

export async function getPosts() {
    return await api.posts
        .browse({
            include: 'authors',
            limit: "all"
        })
        .catch(err => {
            console.error(err);
        });
}
export async function getSinglePost(postSlug) {
    return await api.posts
      .read({
        slug: postSlug
      })
      .catch(err => {
        console.error(err);
      });
  }