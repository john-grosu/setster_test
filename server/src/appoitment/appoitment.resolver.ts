import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AppoitmentResolverBase } from "./base/appoitment.resolver.base";
import { Appoitment } from "./base/Appoitment";
import { AppoitmentService } from "./appoitment.service";

@graphql.Resolver(() => Appoitment)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AppoitmentResolver extends AppoitmentResolverBase {
  constructor(
    protected readonly service: AppoitmentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
