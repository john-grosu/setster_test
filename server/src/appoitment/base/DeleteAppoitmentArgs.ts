import { ArgsType, Field } from "@nestjs/graphql";
import { AppoitmentWhereUniqueInput } from "./AppoitmentWhereUniqueInput";

@ArgsType()
class DeleteAppoitmentArgs {
  @Field(() => AppoitmentWhereUniqueInput, { nullable: false })
  where!: AppoitmentWhereUniqueInput;
}

export { DeleteAppoitmentArgs };
