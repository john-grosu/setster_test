import { ArgsType, Field } from "@nestjs/graphql";
import { PurchaseOrderWhereUniqueInput } from "./PurchaseOrderWhereUniqueInput";

@ArgsType()
class PurchaseOrderFindUniqueArgs {
  @Field(() => PurchaseOrderWhereUniqueInput, { nullable: false })
  where!: PurchaseOrderWhereUniqueInput;
}

export { PurchaseOrderFindUniqueArgs };
