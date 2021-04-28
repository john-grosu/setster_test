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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PurchaseOrder as TPurchaseOrder } from "../api/purchaseOrder/PurchaseOrder";
import { PurchaseOrderCreateInput } from "../api/purchaseOrder/PurchaseOrderCreateInput";

const INITIAL_VALUES = {} as PurchaseOrderCreateInput;

export const CreatePurchaseOrder = (): React.ReactElement => {
  useBreadcrumbs("/purchase-orders/new", "Create Purchase Order");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TPurchaseOrder,
    AxiosError,
    PurchaseOrderCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/purchase-orders", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/purchase-orders"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PurchaseOrderCreateInput) => {
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
            <FormHeader title={"Create Purchase Order"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
