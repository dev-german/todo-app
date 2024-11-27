import { Injectable } from '@angular/core';
import {Priority} from '../../models/todo/priority';
import {TitleCasePipe} from '@angular/common';
import {Category} from '../../models/todo/category';
import {Enum} from '../../models/todo/enum';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  getValuesFromEnum<E extends typeof Priority | typeof Category>(enumClass: E) : Enum []{
    return Object.values(enumClass).map((enumRecord) => (
      new Enum(enumRecord, new TitleCasePipe().transform(enumRecord))
      ))
  }

}
