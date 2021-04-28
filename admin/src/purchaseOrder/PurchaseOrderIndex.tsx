import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PurchaseOrderList } from "./PurchaseOrderList";
import { CreatePurchaseOrder } from "./CreatePurchaseOrder";
import { ViewPurchaseOrder } from "./ViewPurchaseOrder";

export const PurchaseOrderIndex = (): React.ReactElement => {
  useBreadcrumbs("/purchase-orders/", "Purchase Orders");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/purchase-orders/"}
        component={PurchaseOrderList}
      />
      <PrivateRoute
        path={"/purchase-orders/new"}
        component={CreatePurchaseOrder}
      />
      <PrivateRoute
        path={"/purchase-orders/:id"}
        component={ViewPurchaseOrder}
      />
    </Switch>
  );
};
