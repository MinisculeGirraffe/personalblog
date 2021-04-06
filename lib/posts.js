import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://cms.nor.red',
    key: '5b0330ac787b7785e79e33bfd3',
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

export async function getPostsByTag(tag) {
  const filter = "tag:" + tag
  console.log(filter)
  return await api.posts
  .browse(
    {filter: `tag:${tag}`, include: 'authors,tags'}
    )
  .catch(err => {
    console.log(err)
  })
}