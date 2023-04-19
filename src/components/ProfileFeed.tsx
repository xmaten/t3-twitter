import { api } from "~/utils/api";
import { SpinnerPage } from "~/components/Spinner";
import { PostView } from "~/components/PostView";

type Props = {
  userId: string
}

export const ProfileFeed = ({userId}: Props) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({ userId })

  if (isLoading) {
    return <SpinnerPage />
  }

  if (!data || data.length === 0) {
    return <div>No posts</div>
  }

  return (
    <div className="flex flex-col">
      {data.map(postWithUser => (
        <PostView key={postWithUser.post.id} postWithUser={postWithUser} />
      ))}
    </div>
  )
}