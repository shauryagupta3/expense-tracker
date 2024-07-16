import { getSumOfTransactionsOfCurrentMonth } from "@/lib/transactions";

const ExpensesThisMonth = ({ expenses }: { expenses: number }) => {
  return (
    <div className="flex justify-around bg-slate-900 p-2 mt-2 rounded-xl">
      <div>Expenses This Month : </div>
      <p className="text-red-600 font-extrabold">{expenses}</p>
    </div>
  );
};

export default ExpensesThisMonth;
