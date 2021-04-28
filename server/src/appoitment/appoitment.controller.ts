import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AppoitmentService } from "./appoitment.service";
import { AppoitmentControllerBase } from "./base/appoitment.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("appoitments")
@common.Controller("appoitments")
export class AppoitmentController extends AppoitmentControllerBase {
  constructor(
    protected readonly service: AppoitmentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
