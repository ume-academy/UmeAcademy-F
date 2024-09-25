interface Course {
  title: string;
  description?: string;
}

export interface Ttransaction {
  id?: number;
  code: string;
  date: Date;
  total_price: number;
  payment_method_id: number;
  student: number;
  status: number;
  coure?: Course;
}
