import { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from "next/image";
import Link from "next/link";

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
          <Link href={`/${author.id}`}><span>{`@${author.username}`}</span></Link>
          <span className="font-thin">-</span>
          <Link href={`/post/${post.id}`}><span className="font-thin">{dayjs(post.createdAt).fromNow()}</span></Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  )
}