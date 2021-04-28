import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PurchaseOrderServiceBase } from "./base/purchaseOrder.service.base";

@Injectable()
export class PurchaseOrderService extends PurchaseOrderServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
