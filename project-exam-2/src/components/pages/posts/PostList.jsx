import PostCard from "./PostCard";

export default function PostList({ postData }) {
  return (
    <div className="feedCard">
      {postData.map((data, index) => {
        return (
          <PostCard
            key={index}
            id={data.id}
            author={data.author}
            title={data.title}
            body={data.body}
            media={data.media}
            reactions={data.reactions}
            comments={data.comments}
          />
        );
      })}
    </div>
  );
}
