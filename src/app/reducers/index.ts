import { createReducer, createSelector, on } from '@ngrx/store';

import { loadDataAction, loadDataSuccessAction } from '../actions/data.actions';
import { addFloorAction } from '../actions/floor.actions';
import { addRoomAction } from '../actions/room.actions';
import { selectionChangeAction } from '../actions/selection.actions';
import { addTagAction } from '../actions/tags.actions';
import { AddTourInfoAction } from '../actions/tour.actions';
import { addViewsettingAction } from '../actions/viewsettings.actions';
import { Floor } from '../model/floor.interface';
import { Room } from '../model/room.interface';
import { Tag } from '../model/tag.interface';
import { Tour } from '../model/tour.interface';
import { Viewsettings } from '../model/viewsettings.interface';

export interface AppState {
  loading: boolean;

  selection: {
    floorId: string,
    roomId: string,
  };

  tour: Partial<Tour> | undefined;
  floors: Floor[];
  rooms: Room[];
  tags: Tag[];
  viewsettings: Viewsettings | undefined;

}

const initalState: AppState = {
  loading: false,

  selection: {
    floorId: '',
    roomId: '',
  },

  tour: undefined,
  floors: [],
  rooms: [],
  tags: [],
  viewsettings: undefined
};

export const reducers = {
  app: createReducer(
    initalState,
    on(loadDataAction, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(loadDataSuccessAction, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    }),

    on(AddTourInfoAction, (state, { key, data }) => {
      return {
        ...state,
        tour: {
          ...state.tour,
          [key]: data
        },
      };
    }),

    on(addFloorAction, (state, { data }) => {
      return {
        ...state,
        floors: [...state.floors, data],
      };
    }),

    on(addRoomAction, (state, { data }) => {
      return {
        ...state,
        rooms: [...state.rooms, data],
      };
    }),

    on(addTagAction, (state, { data }) => {
      return {
        ...state,
        tags: [...state.tags, data],
      };
    }),

    on(addViewsettingAction, (state, { data }) => {
      return {
        ...state,
        viewsettings: { ...state.viewsettings, ...data },
      };
    }),

    on(selectionChangeAction, (state, { floorId, roomId }) => {
      return {
        ...state,
        selection: { ...state.selection, floorId, roomId },
      };
    }),

  )
};

export const selectAppState = (state: any) => state.app;

export const selectLoading = createSelector(selectAppState, (state: AppState) => state.loading);
export const selectFloors = createSelector(selectAppState, (state: AppState) => state.floors);
export const selectRooms = createSelector(selectAppState, (state: AppState) => state.rooms);
export const selectTags = createSelector(selectAppState, (state: AppState) => state.tags);
export const selectTour = createSelector(selectAppState, (state: AppState) => state.tour);

export const selectRoomsByFloorId = createSelector(selectAppState, (state: AppState, props: { id: string }) => {
  return state.rooms.filter(item => item.tour_floor_id === props.id);
});

export const selectRoomById = createSelector(selectAppState, (state: AppState, props: { id: string }) => {
  return state.rooms.find(item => item.id === props.id);
});

export const getSelectedFloor = createSelector(selectAppState, (state: AppState) => {
  return state.floors.find(item => item.id === state.selection.floorId);
});

export const selectRoomsForSelectedFloor = createSelector(selectAppState, (state: AppState) => {
  return state.rooms.filter(item => item.tour_floor_id === state.selection.floorId);
});

export const getSelectedRoom = createSelector(selectAppState, (state: AppState) => {
  return state.rooms.find(item => item.id === state.selection.roomId);
});
