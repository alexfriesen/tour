import { Room } from './room.interface';
import { Tag } from './tag.interface';

export interface Floor {
  id: string;

  rooms: Room[];
  tag: Tag;
}
