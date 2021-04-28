import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Appoitment as TAppoitment } from "../api/appoitment/Appoitment";

type Data = TAppoitment[];

type Props = Omit<SelectFieldProps, "options">;

export const AppoitmentSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/appoitments",
    async () => {
      const response = await api.get("/api/appoitments");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.address && item.address.length ? item.address : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
