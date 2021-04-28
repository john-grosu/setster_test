import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { PurchaseOrder as TPurchaseOrder } from "../api/purchaseOrder/PurchaseOrder";

type Props = { id: string };

export const PurchaseOrderTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TPurchaseOrder,
    AxiosError,
    [string, string]
  >(["get-/api/purchase-orders", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/purchase-orders"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/purchase-orders"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
