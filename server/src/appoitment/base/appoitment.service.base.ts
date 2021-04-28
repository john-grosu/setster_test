import { PrismaService } from "nestjs-prisma";
import { Prisma, Appoitment, Service } from "@prisma/client";

export class AppoitmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.AppoitmentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppoitmentFindManyArgs>
  ): Promise<Appoitment[]> {
    return this.prisma.appoitment.findMany(args);
  }
  async findOne<T extends Prisma.AppoitmentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppoitmentFindUniqueArgs>
  ): Promise<Appoitment | null> {
    return this.prisma.appoitment.findUnique(args);
  }
  async create<T extends Prisma.AppoitmentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppoitmentCreateArgs>
  ): Promise<Appoitment> {
    return this.prisma.appoitment.create<T>(args);
  }
  async update<T extends Prisma.AppoitmentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppoitmentUpdateArgs>
  ): Promise<Appoitment> {
    return this.prisma.appoitment.update<T>(args);
  }
  async delete<T extends Prisma.AppoitmentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AppoitmentDeleteArgs>
  ): Promise<Appoitment> {
    return this.prisma.appoitment.delete(args);
  }

  async findService(
    parentId: string,
    args: Prisma.ServiceFindManyArgs
  ): Promise<Service[]> {
    return this.prisma.appoitment
      .findUnique({
        where: { id: parentId },
      })
      .service(args);
  }
}
