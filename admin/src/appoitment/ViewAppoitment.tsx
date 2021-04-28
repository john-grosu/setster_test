import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  ToggleField,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ServiceSelect } from "../service/ServiceSelect";
import { Appoitment as TAppoitment } from "../api/appoitment/Appoitment";
import { AppoitmentUpdateInput } from "../api/appoitment/AppoitmentUpdateInput";

export const ViewAppoitment = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/appoitments/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TAppoitment,
    AxiosError,
    [string, string]
  >(["get-/api/appoitments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/appoitments"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TAppoitment, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/appoitments"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//appoitments");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TAppoitment, AxiosError, AppoitmentUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/appoitments"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: AppoitmentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.address);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "active",
        "address",
        "count",
        "email",
        "endDate",
        "service",
        "startDate",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Appoitment"} ${
                  data?.address && data?.address.length
                    ? data.address
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <ToggleField label="active" name="active" />
            </div>
            <div>
              <TextField label="address" name="address" />
            </div>
            <div>
              <TextField label="count" name="count" />
            </div>
            <div>
              <TextField type="email" label="email" name="email" />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="End Date"
                name="endDate"
              />
            </div>
            <div>
              <ServiceSelect label="service" name="service.id" />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Start Date"
                name="startDate"
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
