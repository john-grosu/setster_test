export type AppoitmentCreateInput = {
  active?: boolean | null;
  address?: string | null;
  count?: string | null;
  email?: string | null;
  endDate?: Date | null;
  startDate: Date;
};
