import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap, filter } from 'rxjs/operators';

import { loadDataAction, loadDataFailAction, loadDataSuccessAction } from '../actions/data.actions';
import { addFloorAction } from '../actions/floor.actions';
import { addRoomAction } from '../actions/room.actions';
import { addTagAction } from '../actions/tags.actions';
import { addTourInfoAction } from '../actions/tour.actions';
import { changeSelectionAction } from '../actions/selection.actions';
import { DataService } from '../services/data.service';

const nonTourInfo = ['rooms', 'floors', 'viewsettings', 'tags'];

@Injectable()
export class DataEffects {

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataAction),
      mergeMap(() => this.dataService.fetchData().pipe(
        map((payload) => loadDataSuccessAction({ payload })),
      )),
      catchError((error) => of(loadDataFailAction({ error })))
    )
  );

  loadSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataSuccessAction),
      map(({ payload }) => changeSelectionAction({ roomId: payload.start_tour_room_id, floorId: payload.start_tour_position_id })),
    )
  );

  loadTour$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataSuccessAction),
      mergeMap(({ payload }) => {
        return of(Object.keys(payload)).pipe(
          switchMap(keys => keys),
          filter(key => !nonTourInfo.includes(key)),
          map(key => addTourInfoAction({ key, data: payload[key] }))
        );
      }),
    )
  );

  loadFloors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataSuccessAction),
      mergeMap(({ payload }) => payload.floors),
      map((floor) => addFloorAction({ data: floor })),
    )
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFloorAction),
      mergeMap(({ data }) => data.rooms),
      map((room) => addRoomAction({ data: room })),
    )
  );

  loadFloorTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFloorAction),
      map(({ data }) => addTagAction({ data: data.tag })),
    )
  );

  loadRoomTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoomAction),
      map(({ data }) => addTagAction({ data: data.tag })),
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}

