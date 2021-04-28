import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeletePurchaseOrderArgs } from "./DeletePurchaseOrderArgs";
import { PurchaseOrderFindManyArgs } from "./PurchaseOrderFindManyArgs";
import { PurchaseOrderFindUniqueArgs } from "./PurchaseOrderFindUniqueArgs";
import { PurchaseOrder } from "./PurchaseOrder";
import { PurchaseOrderService } from "../purchaseOrder.service";

@graphql.Resolver(() => PurchaseOrder)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PurchaseOrderResolverBase {
  constructor(
    protected readonly service: PurchaseOrderService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [PurchaseOrder])
  @nestAccessControl.UseRoles({
    resource: "PurchaseOrder",
    action: "read",
    possession: "any",
  })
  async purchaseOrders(
    @graphql.Args() args: PurchaseOrderFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PurchaseOrder[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PurchaseOrder",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PurchaseOrder, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PurchaseOrder",
    action: "read",
    possession: "own",
  })
  async purchaseOrder(
    @graphql.Args() args: PurchaseOrderFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PurchaseOrder | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PurchaseOrder",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PurchaseOrder)
  @nestAccessControl.UseRoles({
    resource: "PurchaseOrder",
    action: "delete",
    possession: "any",
  })
  async deletePurchaseOrder(
    @graphql.Args() args: DeletePurchaseOrderArgs
  ): Promise<PurchaseOrder | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
