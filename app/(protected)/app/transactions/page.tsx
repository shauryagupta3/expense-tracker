import { GetExpenses, SelectExpensesType } from "@/db/schema/expenses";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AllExpenses from "./AllExpenses";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  const userId = session.user.id;
  const allExpenses: SelectExpensesType[] = await GetExpenses(userId);
  return (
    <>
      <div className="w-full overflow-x-hidden overflow-y-auto flex justify-center">
        <AllExpenses expenses={allExpenses} />
      </div>
    </>
  );
};

export default Page;
