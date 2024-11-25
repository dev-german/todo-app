import {Category} from './category';
import {Priority} from './priority';

export interface TodoRegistrationRequest {
  email?: string
  category?: Category
  priority?: Priority
  description?: string
}
