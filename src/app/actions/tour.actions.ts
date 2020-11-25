import { createAction, props } from '@ngrx/store';

export const AddTourInfoAction = createAction('[TOUR] add info', props<{ key: string, data: any }>());
