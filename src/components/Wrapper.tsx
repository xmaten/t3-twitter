import { PropsWithChildren } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full md:max-w-2xl border-x border-slate-400 h-full overflow-y-auto">
          {children}
      </div>
    </main>
  )
}