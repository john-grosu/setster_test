import { ArgsType, Field } from "@nestjs/graphql";
import { PurchaseOrderWhereUniqueInput } from "./PurchaseOrderWhereUniqueInput";

@ArgsType()
class DeletePurchaseOrderArgs {
  @Field(() => PurchaseOrderWhereUniqueInput, { nullable: false })
  where!: PurchaseOrderWhereUniqueInput;
}

export { DeletePurchaseOrderArgs };
