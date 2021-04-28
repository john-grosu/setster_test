import { ArgsType, Field } from "@nestjs/graphql";
import { AppoitmentCreateInput } from "./AppoitmentCreateInput";

@ArgsType()
class CreateAppoitmentArgs {
  @Field(() => AppoitmentCreateInput, { nullable: false })
  data!: AppoitmentCreateInput;
}

export { CreateAppoitmentArgs };
