import { Floor } from './floor.interface';
import { Viewsettings } from './viewsettings.interface';

export interface Tour {
  id: string;
  headline: string;

  floors: Floor[];
  viewsettings: Viewsettings;

  // everything else
  [key: string]: any;
}
