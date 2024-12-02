import {Category} from './category';
import {Priority} from './priority';

export interface Todo {

  id?: number
  email?: string
  category?: Category | undefined
  priority?: Priority | undefined
  description?: string
  isCompleted?: boolean
  createdAt?: string
}
