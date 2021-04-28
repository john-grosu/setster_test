import { ServiceWhereUniqueInput } from "../service/ServiceWhereUniqueInput";

export type AppoitmentUpdateInput = {
  active?: boolean | null;
  address?: string | null;
  count?: string | null;
  email?: string | null;
  endDate?: Date | null;
  service?: ServiceWhereUniqueInput;
  startDate?: Date;
};
