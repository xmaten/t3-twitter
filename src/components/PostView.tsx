import { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from "next/image";

dayjs.extend(relativeTime)

type Props = {
  postWithUser: RouterOutputs["posts"]["getAll"][number]
}

export const PostView = ({postWithUser}: Props) => {
  const {post, author} = postWithUser

  return (
    <div className="flex p-4 border-b border-slate-400 gap-3">
      <Image
        src={author.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />

      <div className="flex flex-col">
        <div className="flex text-slate-200 gap-2 font-bold">
          <span>{`@${author.username}`}</span>
          <span className="font-thin">-</span>
          <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  )
}