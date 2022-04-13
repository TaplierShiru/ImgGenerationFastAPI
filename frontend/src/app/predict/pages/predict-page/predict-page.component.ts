import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

import { GenerateDto } from '../../dtos/generate.dto';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-predict-page',
  templateUrl: './predict-page.component.html',
  styleUrls: ['./predict-page.component.scss'],
  animations: [
    trigger('imageAppear', [
      transition(':enter', [
        style({ opacity: 0, height: '0%' }),
        animate('1000ms', style({ opacity: 1, height: '100%' }))
      ]),
      transition(':leave', [animate('1000ms', style({ opacity: 0, height: '0%' }))])
    ])
  ]
})
export class PredictPageComponent implements OnInit {
  modelArray: Array<string>;
  labelArray?: Array<string>;
  selectedModelName: string;
  selectedLabel: string;

  isInProgress: boolean;
  imageUrl?: string;

  constructor(private modelService: ModelService, private authenticationService: AuthenticationService) {
    this.isInProgress = false;
    this.imageUrl = undefined;
  }

  async ngOnInit() {
    const resultGetAll = await this.modelService.getAll();
    this.modelArray = resultGetAll.modelNamesArray;
    this.labelArray = undefined;
  }

  async getLabelArray(): Promise<Array<string>> {
    const resultGetLabelArray = this.modelService.getLabelsByModel(this.selectedModelName);
    return (await resultGetLabelArray).modelLabelArray;
  }

  async changeSelectedModel(event: any) {
    this.labelArray = await (await this.modelService.getLabelsByModel(this.selectedModelName)).modelLabelArray;
  }

  async generateImageClick() {
    this.isInProgress = true;
    this.imageUrl = undefined;

    const currentUserDto = this.authenticationService.currentUserValue;

    if (!currentUserDto) {
      return;
    }

    const generateDto = {
      label: await (await this.getLabelArray()).indexOf(this.selectedLabel),
      username: currentUserDto.username,
      modelName: this.selectedModelName
    } as GenerateDto;
    const result = await this.modelService.generateImg(generateDto);
    if (result.status_task) {
      // TODO: Not sure that its good to write like here....
      const checkImage = async () => {
        const resultCheck = await this.modelService.getResult(currentUserDto.username);
        if (resultCheck) {
          // TODO: Convert sended image to url
          this.isInProgress = false;
          this.imageUrl = resultCheck;
        } else {
          // We do not get image - wait
          checkStatusImage = setTimeout(checkImage, 5000);
        }
      };

      let checkStatusImage = setTimeout(checkImage, 5000);
    }
  }
}
