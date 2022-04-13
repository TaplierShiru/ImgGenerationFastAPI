import { Injectable } from '@angular/core';
import { MockModels } from 'src/app/utils/mock/mock-models';
import { FakeService } from 'src/app/utils/services/fake-base.service';

import { GenerateDto } from '../dtos/generate.dto';
import { ModelDto } from '../dtos/model.dto';
import { StartGenerateResponse } from '../utils/generate-response.interface';
import { GetAllModelResponseInterface } from '../utils/get-all-model-response.interface';
import { GetLabelsResponseInterface } from '../utils/get-labels-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeModelService extends FakeService<ModelDto, null> {
  mockModel: MockModels;

  constructor() {
    super();
    this.mockModel = new MockModels();
  }

  async getAll(): Promise<GetAllModelResponseInterface> {
    return new Promise<GetAllModelResponseInterface>((resolve, reject) => {
      resolve({ result: true, modelNamesArray: this.mockModel.getAllModels() });
    });
  }

  async getLabelsByModel(modelName: string): Promise<GetLabelsResponseInterface> {
    return new Promise<GetLabelsResponseInterface>((resolve, reject) => {
      resolve({ result: true, modelLabelArray: this.mockModel.getLabelByModelName(modelName) });
    });
  }

  async generateImg(generateDto: GenerateDto): Promise<StartGenerateResponse> {
    return new Promise<StartGenerateResponse>((resolve, reject) => {
      resolve({ status_task: true });
    });
  }

  async getResult(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve(this.mockModel.generateSingleImage());
    });
  }
}
