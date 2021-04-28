import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { PurchaseOrder as TPurchaseOrder } from "../api/purchaseOrder/PurchaseOrder";

type Data = TPurchaseOrder[];

type Props = Omit<SelectFieldProps, "options">;

export const PurchaseOrderSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/purchase-orders",
    async () => {
      const response = await api.get("/api/purchase-orders");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
