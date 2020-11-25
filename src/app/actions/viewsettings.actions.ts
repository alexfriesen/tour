import { createAction, props } from '@ngrx/store';
import { Viewsettings } from '../model/viewsettings.interface';

export const addViewsettingAction = createAction('[VIEWSETTING] add', props<{ data: Viewsettings }>());
