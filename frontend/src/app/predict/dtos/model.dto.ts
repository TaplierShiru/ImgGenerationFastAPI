import { BaseDto } from 'src/app/core/dtos/base.dto';

export class ModelDto extends BaseDto {
  modelName: string;
  labelArray: Array<string>;
}
