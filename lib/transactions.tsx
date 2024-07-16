"use server";

import { Transaction } from "@prisma/client";
import { getUser } from "./auth/getUser";
import { TransactionSchema, TransactionState } from "./definitions";
import { db } from "./db";
export const AddTransaction = async (
  state: TransactionState,
  formData: FormData
): Promise<TransactionState | undefined> => {
  const ValidatedData = TransactionSchema.safeParse({
    amount: Number(formData.get("amount")),
    text: formData.get("text"),
  });

  if (!ValidatedData?.success) {
    return { errors: ValidatedData.error.flatten().fieldErrors };
  }
  const { amount, text } = ValidatedData.data;

  const user = await getUser();

  if (!user) {
    return { message: "An error occured" };
  }

  const userID = user.id;

  const transaction = await db.transaction.create({
    data: {
      amount: amount,
      text: text,
      userId: userID,
    },
  });
};

// export const getMostRecentTransaction = async () => {};
export const getTransactionsPagination = async (skip = 0, take = 1) => {
  const user = await getUser();

  if (!user) {
    return { message: "An error occured" };
  }

  const userID = user.id;

  const transactions = await db.transaction.findMany({
    skip: skip,
    take: take,
    where: { userId: userID },
    select: { amount: true, text: true, createdAt: true },
  });

  return transactions;
};

export const getAllTransactions = async () => {
  const user = await getUser();

  if (!user) {
    return { message: "An error occured" };
  }

  const userID = user.id;

  const transactions = await db.transaction.findMany({
    where: { userId: userID },
    select: { amount: true, text: true, createdAt: true },
  });

  return transactions;
};

export const getRecentTransaction = async () => {
  const user = await getUser();

  const userID = user?.id;

  const transactions = await db.transaction.findMany({
    where: { userId: userID },
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  return transactions[0];
};

export const getAllTransactionsThisMonth = async () => {
  const user = await getUser();

  const userID = user?.id;

  const transactions = await db.transaction.findMany({
    where: { userId: userID },
    select: { amount: true, text: true, createdAt: true },
  });

  return transactions;
};

export const getTransactionsOfCurrentMonth = async () => {
  const today: Date = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const transactions = await db.transaction.findMany({
    where: { createdAt: { gte: firstOfMonth } },
  });

  return transactions;
};

export const getSumOfTransactionsOfCurrentMonth = async () => {
  const transactions = await getTransactionsOfCurrentMonth();
  return sumOfTransacions(transactions);
};

export const sumOfTransacions = (arrOfTransactions: Transaction[]) => {
  return arrOfTransactions.reduce((sum, { amount }) => sum + amount, 0);
};
