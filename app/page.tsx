import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/app");
  }
  return <><p>hello</p></>;
};

export default Home;
