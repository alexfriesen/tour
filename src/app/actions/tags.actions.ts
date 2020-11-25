import { createAction, props } from '@ngrx/store';
import { Tag } from '../model/tag.interface';

export const addTagAction = createAction('[TAGS] add', props<{ data: Tag }>());
