import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  CircleIcon,
  EnumCircleIconStyle,
  TimeSince,
} from "@amplication/design-system";

import { ServiceTitle } from "../service/ServiceTitle";
import { Appoitment as TAppoitment } from "../api/appoitment/Appoitment";

type Data = TAppoitment[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "active",
    title: "active",
    sortable: false,
  },
  {
    name: "address",
    title: "address",
    sortable: false,
  },
  {
    name: "count",
    title: "count",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "email",
    title: "email",
    sortable: false,
  },
  {
    name: "endDate",
    title: "End Date",
    sortable: false,
  },
  {
    name: "service",
    title: "service",
    sortable: false,
  },
  {
    name: "startDate",
    title: "Start Date",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const AppoitmentList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/appoitments",
    async () => {
      const response = await api.get("/api/appoitments");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Appoitments"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/appoitments/new"}>
            <Button>Create Appoitment </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TAppoitment) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/appoitments"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.active && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.address}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.count}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.email}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.endDate}</>
                </DataGridCell>
                <DataGridCell>
                  <ServiceTitle id={item.service?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.startDate}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
