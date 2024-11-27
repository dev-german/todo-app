import {Category} from './category';
import {Priority} from './priority';

export class Enum {
  private value?: string
  private label?: string

  constructor(value: string, label: string) {
    this.value = value
    this.label = label
  }
}


