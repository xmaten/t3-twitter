import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { CreatePostWizard } from "~/components/CreatePostWizard";
import { Feed } from "~/components/Feed";
import { Wrapper } from "~/components/Wrapper";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn} = useUser()
  api.posts.getAll.useQuery()

  if (!userLoaded) {
    return <div />
  }

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Twitter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div className="flex border-b border-slate-400 p-4">
          <div className="flex justify-center w-full">
            {isSignedIn && <CreatePostWizard />}
            {!isSignedIn && <SignInButton />}
          </div>
        </div>
        <Feed />
      </Wrapper>
    </>
  );
};

export default Home;
