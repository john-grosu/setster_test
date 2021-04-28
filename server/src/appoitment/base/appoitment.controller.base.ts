import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { AppoitmentService } from "../appoitment.service";
import { AppoitmentCreateInput } from "./AppoitmentCreateInput";
import { AppoitmentWhereInput } from "./AppoitmentWhereInput";
import { AppoitmentWhereUniqueInput } from "./AppoitmentWhereUniqueInput";
import { AppoitmentUpdateInput } from "./AppoitmentUpdateInput";
import { Appoitment } from "./Appoitment";

export class AppoitmentControllerBase {
  constructor(
    protected readonly service: AppoitmentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Appoitment })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: AppoitmentCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appoitment> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Appoitment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Appoitment"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        active: true,
        address: true,
        count: true,
        createdAt: true,
        email: true,
        endDate: true,
        id: true,
        startDate: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Appoitment] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: AppoitmentWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appoitment[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Appoitment",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        active: true,
        address: true,
        count: true,
        createdAt: true,
        email: true,
        endDate: true,
        id: true,
        startDate: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Appoitment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: AppoitmentWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appoitment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Appoitment",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        active: true,
        address: true,
        count: true,
        createdAt: true,
        email: true,
        endDate: true,
        id: true,
        startDate: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Appoitment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: AppoitmentWhereUniqueInput,
    @common.Body()
    data: AppoitmentUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Appoitment | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Appoitment",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Appoitment"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          active: true,
          address: true,
          count: true,
          createdAt: true,
          email: true,
          endDate: true,
          id: true,
          startDate: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Appoitment",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Appoitment })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: AppoitmentWhereUniqueInput
  ): Promise<Appoitment | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          active: true,
          address: true,
          count: true,
          createdAt: true,
          email: true,
          endDate: true,
          id: true,
          startDate: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
