import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Tag } from '../../model/tag.interface';
import { loadDataAction } from '../../actions/data.actions';
import { changeSelectionAction } from '../../actions/selection.actions';
import { AppState, selectLoading, selectTour, selectFloors, getSelectedRoom, selectRoomsForSelectedFloor } from '../../reducers';

@Component({
  selector: 'app-container-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent {

  loading$ = this.store.select(selectLoading);

  tour$ = this.store.select(selectTour);
  floors$ = this.store.select(selectFloors);
  rooms$ = this.store.select(selectRoomsForSelectedFloor);

  selectedRoom$ = this.store.select(getSelectedRoom);

  form = new FormGroup({
    floorId: new FormControl(null),
    roomId: new FormControl(null),
  });

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.store.dispatch(loadDataAction());

    // this wont work https://github.com/angular/angular/issues/39702
    // this.form.valueChanges.pipe(
    //   map(value => this.store.dispatch(selectionChangeAction(value)))
    // )
    this.form.valueChanges.subscribe(value => this.store.dispatch(changeSelectionAction(value)));
  }

  getTagLabel(tag: Tag): string {
    if (tag.de_DE) {
      return tag.de_DE;
    }

    return tag[tag.fallback_language];
  }

}
