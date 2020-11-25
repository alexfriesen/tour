import { createAction, props } from '@ngrx/store';
import { Room } from '../model/room.interface';

export const addRoomAction = createAction('[ROOM] add', props<{ data: Room }>());
