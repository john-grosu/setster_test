import { ArgsType, Field } from "@nestjs/graphql";
import { AppoitmentWhereUniqueInput } from "./AppoitmentWhereUniqueInput";

@ArgsType()
class AppoitmentFindUniqueArgs {
  @Field(() => AppoitmentWhereUniqueInput, { nullable: false })
  where!: AppoitmentWhereUniqueInput;
}

export { AppoitmentFindUniqueArgs };
