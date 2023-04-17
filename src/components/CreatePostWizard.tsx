import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export const CreatePostWizard = () => {
  const { user } = useUser()
  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: async () => {
      setValue('')
      await ctx.posts.getAll.invalidate()
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error("Failed to post! Please try again")
      }
    }
  })

  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate({ content: value })
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
          disabled={isPosting}
        />
      </form>
    </div>
  )
}