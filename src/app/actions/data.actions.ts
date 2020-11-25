import { createAction, props } from '@ngrx/store';
import { Tour } from '../model/tour.interface';

export const loadDataAction = createAction('[DATA] Load Data');
export const loadDataFailAction = createAction('[DATA] Load Data Fail', props<{ error: unknown }>());
export const loadDataSuccessAction = createAction('[DATA] Load Data Success', props<{ payload: Tour }>());
