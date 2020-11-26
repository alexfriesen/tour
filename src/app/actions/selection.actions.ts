import { createAction, props } from '@ngrx/store';

export const changeSelectionAction = createAction('[SELECTION] change', props<{ floorId: string, roomId: string }>());
