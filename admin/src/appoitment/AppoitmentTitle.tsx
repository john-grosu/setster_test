import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Appoitment as TAppoitment } from "../api/appoitment/Appoitment";

type Props = { id: string };

export const AppoitmentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TAppoitment,
    AxiosError,
    [string, string]
  >(["get-/api/appoitments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/appoitments"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/appoitments"}/${id}`} className="entity-id">
      {data?.address && data?.address.length ? data.address : data?.id}
    </Link>
  );
};
