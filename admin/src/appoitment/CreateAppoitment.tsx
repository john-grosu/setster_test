import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  ToggleField,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ServiceSelect } from "../service/ServiceSelect";
import { Appoitment as TAppoitment } from "../api/appoitment/Appoitment";
import { AppoitmentCreateInput } from "../api/appoitment/AppoitmentCreateInput";

const INITIAL_VALUES = {} as AppoitmentCreateInput;

export const CreateAppoitment = (): React.ReactElement => {
  useBreadcrumbs("/appoitments/new", "Create Appoitment");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TAppoitment,
    AxiosError,
    AppoitmentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/appoitments", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/appoitments"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: AppoitmentCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Appoitment"}>
              <Button type="submit" disabled={isLoading}>
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
            <TextField type="datetime-local" label="End Date" name="endDate" />
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
