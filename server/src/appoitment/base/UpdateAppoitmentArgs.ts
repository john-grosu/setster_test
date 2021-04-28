import { ArgsType, Field } from "@nestjs/graphql";
import { AppoitmentWhereUniqueInput } from "./AppoitmentWhereUniqueInput";
import { AppoitmentUpdateInput } from "./AppoitmentUpdateInput";

@ArgsType()
class UpdateAppoitmentArgs {
  @Field(() => AppoitmentWhereUniqueInput, { nullable: false })
  where!: AppoitmentWhereUniqueInput;
  @Field(() => AppoitmentUpdateInput, { nullable: false })
  data!: AppoitmentUpdateInput;
}

export { UpdateAppoitmentArgs };
