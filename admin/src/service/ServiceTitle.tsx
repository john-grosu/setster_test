import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Service as TService } from "../api/service/Service";

type Props = { id: string };

export const ServiceTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TService,
    AxiosError,
    [string, string]
  >(["get-/api/services", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/services"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/services"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
