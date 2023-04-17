import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";
import { FormEvent, useState } from "react";

export const CreatePostWizard = () => {
  const { user } = useUser()
  const {mutate} = api.posts.create.useMutation()

  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate({ content: value })
    setValue('')
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex gap-4 w-full">
      <Image src={user.profileImageUrl} alt="Profile image" width={56} height={56} className="h-14 w-14 rounded-full" />
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          placeholder="Type some emojis"
          className="bg-transparent grow outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  )
}