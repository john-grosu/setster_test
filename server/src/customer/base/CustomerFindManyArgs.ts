import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereInput } from "./CustomerWhereInput";

@ArgsType()
class CustomerFindManyArgs {
  @Field(() => CustomerWhereInput, { nullable: true })
  where?: CustomerWhereInput;
}

export { CustomerFindManyArgs };
