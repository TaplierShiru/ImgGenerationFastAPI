import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

import { GenerateDto } from '../dtos/generate.dto';
import { ModelDto } from '../dtos/model.dto';
import { StartGenerateResponse } from '../utils/generate-response.interface';
import { GetAllModelResponseInterface } from '../utils/get-all-model-response.interface';
import { GetLabelsResponseInterface } from '../utils/get-labels-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends ApiService<ModelDto, null> {
  constructor(http: HttpClient) {
    super(http, ModelDto);
  }

  async getAll(): Promise<GetAllModelResponseInterface> {
    return new Promise<GetAllModelResponseInterface>((resolve, reject) => {
      resolve({ result: true, modelNamesArray: [] });
    });
  }

  async getLabelsByModel(modelName: string): Promise<GetLabelsResponseInterface> {
    return new Promise<GetLabelsResponseInterface>((resolve, reject) => {
      resolve({ result: true, modelLabelArray: [] });
    });
  }

  async generateImg(generateDto: GenerateDto): Promise<StartGenerateResponse> {
    return new Promise<StartGenerateResponse>((resolve, reject) => {
      resolve({ status_task: true });
    });
  }

  async getResult(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve('');
    });
  }
}
