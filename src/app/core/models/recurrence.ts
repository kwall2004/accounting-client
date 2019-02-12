export interface Recurrence {
  id?: number;
  description: string;
  category: string;
  amount: number;
  weeklyFrequency: number;
  weeklyDay: string;
  monthlyFrequency: number;
  monthlyDate: number;
  startDate: Date;
  endDate: Date;
}
