import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PurchaseOrderResolverBase } from "./base/purchaseOrder.resolver.base";
import { PurchaseOrder } from "./base/PurchaseOrder";
import { PurchaseOrderService } from "./purchaseOrder.service";

@graphql.Resolver(() => PurchaseOrder)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PurchaseOrderResolver extends PurchaseOrderResolverBase {
  constructor(
    protected readonly service: PurchaseOrderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
