import faker from '@faker-js/faker';
import { ModelDto } from 'src/app/predict/dtos/model.dto';

import { getRandomInt } from '../helpers/number-generation.helper';

export class MockModels {
  numberOfGeneratedElements = 5;
  atomicId = this.numberOfGeneratedElements + 10;
  models: Array<ModelDto> = [];

  constructor() {
    for (let i = 0; i < this.numberOfGeneratedElements; i++) {
      this.models.push(this.generateSingleModel(i));
    }
  }

  list(): Array<ModelDto> {
    return this.models;
  }

  getAllModels(): Array<string> {
    const modelNames: Array<string> = [];
    this.models.forEach(value => modelNames.push(value.modelName));
    return modelNames;
  }

  getLabelByModelName(modelName: string): Array<string> {
    return this.models.filter(value => value.modelName === modelName)[0].labelArray;
  }

  generateSingleModel(id: number): ModelDto {
    const labelArray: Array<string> = [];
    for (let i = 0; i < getRandomInt(10); i++) {
      labelArray.push(faker.internet.color());
    }
    return {
      id,
      modelName: faker.internet.userName(),
      labelArray
    };
  }

  generateSingleImage(): string {
    return faker.image.cats();
  }
}
