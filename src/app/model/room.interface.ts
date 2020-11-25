import { Tag } from './tag.interface';

export interface RoomPositionPanos {
  file: {
    absolute_path_url: string
  };
}

export interface RoomPosition {
  id: string;

  panos: RoomPositionPanos[];
}

export interface Room {
  id: string;
  created_at: string;
  deleted_at: string;
  dollhouse_space_id: string;
  order_position_in_floor: number;
  positions: RoomPosition[];
  tag: Tag;
  tags_id: string;
  tour_floor_id: string;
  tour_id: string;
  updated_at: string;
}
