import { PrismaService } from "nestjs-prisma";
import { Prisma, PurchaseOrder } from "@prisma/client";

export class PurchaseOrderServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.PurchaseOrderFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseOrderFindManyArgs>
  ): Promise<PurchaseOrder[]> {
    return this.prisma.purchaseOrder.findMany(args);
  }
  async findOne<T extends Prisma.PurchaseOrderFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseOrderFindUniqueArgs>
  ): Promise<PurchaseOrder | null> {
    return this.prisma.purchaseOrder.findUnique(args);
  }
  async create<T extends Prisma.PurchaseOrderCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseOrderCreateArgs>
  ): Promise<PurchaseOrder> {
    return this.prisma.purchaseOrder.create<T>(args);
  }
  async update<T extends Prisma.PurchaseOrderUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseOrderUpdateArgs>
  ): Promise<PurchaseOrder> {
    return this.prisma.purchaseOrder.update<T>(args);
  }
  async delete<T extends Prisma.PurchaseOrderDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PurchaseOrderDeleteArgs>
  ): Promise<PurchaseOrder> {
    return this.prisma.purchaseOrder.delete(args);
  }
}
