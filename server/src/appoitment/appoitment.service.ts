import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AppoitmentServiceBase } from "./base/appoitment.service.base";

@Injectable()
export class AppoitmentService extends AppoitmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
