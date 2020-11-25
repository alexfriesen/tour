import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadDataAction } from './actions/data.actions';
import { Room } from './model/room.interface';
import { Tag } from './model/tag.interface';
import { AppState, selectLoading, selectRoomsByFloorId, selectTour, selectFloors, selectRoomById } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = this.store.select(selectLoading);

  tour$ = this.store.select(selectTour);
  floors$ = this.store.select(selectFloors);
  rooms$: Observable<Room[]> = of([]);

  selectedRoom: Room | undefined;

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadDataAction());
  }

  onFloorSelected(event: MatSelectChange): void {
    this.rooms$ = this.store.select(selectRoomsByFloorId, { id: event.value });
  }

  onRoomSelected(event: MatSelectChange): void {
    this.store.select(selectRoomById, { id: event.value }).subscribe(room => {
      this.selectedRoom = room;
    });
  }

  getTagLabel(tag: Tag): string {
    if (tag.de_DE) {
      return tag.de_DE;
    }

    return tag[tag.fallback_language];
  }

}
