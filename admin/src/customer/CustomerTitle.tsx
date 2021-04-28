import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Customer as TCustomer } from "../api/customer/Customer";

type Props = { id: string };

export const CustomerTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TCustomer,
    AxiosError,
    [string, string]
  >(["get-/api/customers", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/customers"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/customers"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
