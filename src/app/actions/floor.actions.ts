import { createAction, props } from '@ngrx/store';
import { Floor } from '../model/floor.interface';

export const addFloorAction = createAction('[FLOOR] add', props<{ data: Floor }>());
