import { createAction, props } from '@ngrx/store';

export const addTourInfoAction = createAction('[TOUR] add info', props<{ key: string, data: any }>());
