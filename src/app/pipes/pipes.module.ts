import { NgModule } from '@angular/core';

import { TagLabelPipe } from './tag-label/tag-label.pipe';

@NgModule({
  declarations: [
    TagLabelPipe,
  ],
  exports: [
    TagLabelPipe
  ]
})
export class PipesModule { }
