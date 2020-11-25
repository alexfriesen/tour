import { Tour } from './tour.interface';

export interface Payload {
  success: boolean;
  code: number;
  message: string;
  response: Tour;
}
