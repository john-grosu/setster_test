import { Module } from "@nestjs/common";
import { AppoitmentModuleBase } from "./base/appoitment.module.base";
import { AppoitmentService } from "./appoitment.service";
import { AppoitmentController } from "./appoitment.controller";
import { AppoitmentResolver } from "./appoitment.resolver";

@Module({
  imports: [AppoitmentModuleBase],
  controllers: [AppoitmentController],
  providers: [AppoitmentService, AppoitmentResolver],
  exports: [AppoitmentService],
})
export class AppoitmentModule {}
