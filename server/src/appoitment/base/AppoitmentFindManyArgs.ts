import { ArgsType, Field } from "@nestjs/graphql";
import { AppoitmentWhereInput } from "./AppoitmentWhereInput";

@ArgsType()
class AppoitmentFindManyArgs {
  @Field(() => AppoitmentWhereInput, { nullable: true })
  where?: AppoitmentWhereInput;
}

export { AppoitmentFindManyArgs };
