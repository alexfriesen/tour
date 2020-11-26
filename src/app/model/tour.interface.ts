import { Floor } from './floor.interface';
import { Viewsettings } from './viewsettings.interface';

export interface Tour {
  id: string;
  headline: string;

  start_tour_room_id: string; // tour start room
  start_tour_position_id: string; // tour start floor

  floors: Floor[];
  viewsettings: Viewsettings;

  // everything else
  [key: string]: any;
}
