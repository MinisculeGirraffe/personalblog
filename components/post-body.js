export default function PostBody({ content }) {
  return (
    <div className="postBody">
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}
