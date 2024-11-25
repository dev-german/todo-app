import {Category} from './category';
import {Priority} from './priority';

export interface TodoUpdateRequest {
  id?: number
  category?: Category
  priority?: Priority
  description?: string
  isCompleted?: boolean
}
