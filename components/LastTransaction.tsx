import { getRecentTransaction } from "@/lib/transactions";
import { Transaction } from "@prisma/client";

const LastTransaction = async ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const date = transaction.createdAt.getDate()+"-"+transaction.createdAt.getDate()+"-"+transaction.createdAt.getFullYear()
  const time = transaction.createdAt.getHours()+":"+transaction.createdAt.getMinutes()
  return (
    <div className="flex justify-around items-center bg-slate-900 p-2 mb-2 rounded-xl">
      <div className="flex flex-col">
        <p>{transaction.text}</p>
        {transaction.createdAt && <p className="text-xs">{date} {time}</p>}{" "}
      </div>
      <p className="text-red-600 font-extrabold">{transaction.amount}</p>
    </div>
  );
};

export default LastTransaction;
