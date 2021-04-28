import { ArgsType, Field } from "@nestjs/graphql";
import { PurchaseOrderWhereInput } from "./PurchaseOrderWhereInput";

@ArgsType()
class PurchaseOrderFindManyArgs {
  @Field(() => PurchaseOrderWhereInput, { nullable: true })
  where?: PurchaseOrderWhereInput;
}

export { PurchaseOrderFindManyArgs };
