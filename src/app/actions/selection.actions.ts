import { createAction, props } from '@ngrx/store';

export const selectionChangeAction = createAction('[SELECTION] change', props<{ floorId: string, roomId: string }>());
