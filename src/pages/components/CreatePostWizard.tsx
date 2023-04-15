import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const CreatePostWizard = () => {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <div className="flex gap-4 w-full">
      <Image src={user.profileImageUrl} alt="Profile image" width={56} height={56} className="h-14 w-14 rounded-full" />
      <input placeholder="Type some emojis" className="bg-transparent grow outline-none" />
    </div>
  )
}