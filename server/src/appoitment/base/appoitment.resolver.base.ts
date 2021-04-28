import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateAppoitmentArgs } from "./CreateAppoitmentArgs";
import { UpdateAppoitmentArgs } from "./UpdateAppoitmentArgs";
import { DeleteAppoitmentArgs } from "./DeleteAppoitmentArgs";
import { AppoitmentFindManyArgs } from "./AppoitmentFindManyArgs";
import { AppoitmentFindUniqueArgs } from "./AppoitmentFindUniqueArgs";
import { Appoitment } from "./Appoitment";
import { ServiceFindManyArgs } from "../../service/base/ServiceFindManyArgs";
import { Service } from "../../service/base/Service";
import { AppoitmentService } from "../appoitment.service";

@graphql.Resolver(() => Appoitment)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AppoitmentResolverBase {
  constructor(
    protected readonly service: AppoitmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Appoitment])
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "read",
    possession: "any",
  })
  async appoitments(
    @graphql.Args() args: AppoitmentFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appoitment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appoitment",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Appoitment, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "read",
    possession: "own",
  })
  async appoitment(
    @graphql.Args() args: AppoitmentFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appoitment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Appoitment",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Appoitment)
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "create",
    possession: "any",
  })
  async createAppoitment(
    @graphql.Args() args: CreateAppoitmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appoitment> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Appoitment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Appoitment"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Appoitment)
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "update",
    possession: "any",
  })
  async updateAppoitment(
    @graphql.Args() args: UpdateAppoitmentArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Appoitment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Appoitment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Appoitment"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Appoitment)
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "delete",
    possession: "any",
  })
  async deleteAppoitment(
    @graphql.Args() args: DeleteAppoitmentArgs
  ): Promise<Appoitment | null> {
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

  @graphql.ResolveField(() => [Service])
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "read",
    possession: "any",
  })
  async service(
    @graphql.Parent() parent: Appoitment,
    @graphql.Args() args: ServiceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Service[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Service",
    });
    const results = await this.service.findService(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
