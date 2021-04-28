import { Module } from "@nestjs/common";
import { PurchaseOrderModuleBase } from "./base/purchaseOrder.module.base";
import { PurchaseOrderService } from "./purchaseOrder.service";
import { PurchaseOrderController } from "./purchaseOrder.controller";
import { PurchaseOrderResolver } from "./purchaseOrder.resolver";

@Module({
  imports: [PurchaseOrderModuleBase],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService, PurchaseOrderResolver],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
