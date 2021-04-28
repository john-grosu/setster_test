import { ServiceWhereUniqueInput } from "../service/ServiceWhereUniqueInput";

export type Appoitment = {
  active: boolean | null;
  address: string | null;
  count: string | null;
  createdAt: Date;
  email: string | null;
  endDate: Date | null;
  id: string;
  service?: ServiceWhereUniqueInput;
  startDate: Date;
  updatedAt: Date;
};
