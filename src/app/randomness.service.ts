import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomnessService {
  constructor() {}

  generateParameters() {
    let params = {};
    switch (this.generateWholeNumber(10)) {
      case 1:
        params = Object.assign(params, {
          skip: this.generateWholeNumber(1000000),
          take: this.generateWholeNumber(1000000),
        });
        break;
      case 2:
        params = Object.assign(params, {
          lorem: this.generateWholeNumber(1000000),
          ipsum: this.generateWholeNumber(1000000),
        });
        break;
      case 3:
        params = Object.assign(params, {
          dolor: this.generateWholeNumber(1000000),
          sit: this.generateWholeNumber(1000000),
        });
        break;
      case 4:
        params = Object.assign(params, {
          amet: this.generateWholeNumber(1000000),
          consectitur: this.generateWholeNumber(1000000),
        });
        break;
      case 5:
        params = Object.assign(params, {
          filter: this.generateWholeNumber(1000000),
          length: this.generateWholeNumber(1000000),
        });
        break;
      case 6:
        params = Object.assign(params, {
          param: this.generateWholeNumber(1000000),
          map: this.generateWholeNumber(1000000),
        });
        break;
      case 7:
        params = Object.assign(params, {
          year: this.generateWholeNumber(1000000),
          limit: this.generateWholeNumber(1000000),
        });
        break;
      case 8:
        params = Object.assign(params, {
          somepara: this.generateWholeNumber(1000000),
          buffalo: this.generateWholeNumber(1000000),
        });
        break;
      case 9:
        params = Object.assign(params, {
          fagri: this.generateWholeNumber(1000000),
          sprattus: this.generateWholeNumber(1000000),
        });
        break;
      default:
        params = Object.assign(params, {
          bacon: this.generateWholeNumber(1000000),
          lasagna: this.generateWholeNumber(1000000),
        });
        break;
    }
    return params;
  }

  private generateWholeNumber(end: number = 10): number {
    return ~~(Math.random() * end);
  }
}
