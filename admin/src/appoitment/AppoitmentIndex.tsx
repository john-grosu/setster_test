import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { AppoitmentList } from "./AppoitmentList";
import { CreateAppoitment } from "./CreateAppoitment";
import { ViewAppoitment } from "./ViewAppoitment";

export const AppoitmentIndex = (): React.ReactElement => {
  useBreadcrumbs("/appoitments/", "Appoitments");

  return (
    <Switch>
      <PrivateRoute exact path={"/appoitments/"} component={AppoitmentList} />
      <PrivateRoute path={"/appoitments/new"} component={CreateAppoitment} />
      <PrivateRoute path={"/appoitments/:id"} component={ViewAppoitment} />
    </Switch>
  );
};
