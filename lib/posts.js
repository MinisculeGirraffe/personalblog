import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://crm.daniel.nor.red',
    key: '7d8226c087fd97084e0c5c6b66',
    version: "v3"
});

export async function getPosts() {
    return await api.posts
        .browse({
            include: 'authors,tags',
            limit: "all",
        })
        .catch(err => {
            console.error(err);
        });
}
export async function getSinglePost(postSlug) {
    return await api.posts
      .read({
        slug: postSlug
      }, {include: 'authors,tags'})
      .catch(err => {
        console.error(err);
      });
  }