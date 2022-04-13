import { HttpClient } from '@angular/common/http';

import { BaseDto } from '../dtos/base.dto';

export class ApiService<D extends BaseDto, C> {
  constructor(protected http: HttpClient, protected dtoBuilder: new (dtoBuilder?: any) => D) {}
  /*
  async get(id: number): Promise<D> {
    const request = this.http.get(`${environment.apiUrl}/${this.endpoint}/${id}`);
    const dto = await firstValueFrom(request);
    return plainToClass(this.dto, dto);
  }

  async create(data: C): Promise<D> {
    const request = this.http.post(`${environment.apiUrl}/${this.endpoint}`, instanceToPlain(data));
    const dto = await firstValueFrom(request);
    return plainToClass(this.dto, dto);
  }

  async delete(id: number): Promise<any> {
    const request = this.http.delete(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }
*/
}
