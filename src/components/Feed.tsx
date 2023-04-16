import { api } from "~/utils/api";
import { PostView } from "~/components/PostView";
import { SpinnerPage } from "~/components/Spinner";

export const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery()

  if (isLoading) {
    return <SpinnerPage />
  }

  if (!data) {
    return <div>No data</div>
  }

  return <div className="flex flex-col">
    {data.map((postWithUser) => (
      <PostView key={postWithUser.post.id} postWithUser={postWithUser}  />
    ))}
  </div>
}