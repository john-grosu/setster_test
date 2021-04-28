import { ServiceWhereUniqueInput } from "../service/ServiceWhereUniqueInput";

export type AppoitmentWhereInput = {
  active?: boolean;
  address?: string;
  count?: string;
  createdAt?: Date;
  email?: string;
  endDate?: Date;
  id?: string;
  service?: ServiceWhereUniqueInput;
  startDate?: Date;
  updatedAt?: Date;
};
