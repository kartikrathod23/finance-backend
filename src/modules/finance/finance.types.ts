export type CreateRecordInput = {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  notes?: string;
};

export type UpdateRecordInput = Partial<CreateRecordInput>;

export type QueryParams = {
  type?: "INCOME" | "EXPENSE";
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  limit?: string;
  search?:string;
};