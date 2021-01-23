export default function PostBody({ content }) {
  return (
    <div className="">
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}
