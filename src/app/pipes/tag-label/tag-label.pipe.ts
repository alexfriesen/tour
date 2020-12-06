import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { supportedLocales, Tag } from 'src/app/model/tag.interface';

@Pipe({
  name: 'tagLabel'
})
export class TagLabelPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) private localeId: supportedLocales
  ) { }

  transform(value: Tag, locale?: supportedLocales): string {
    const localeId = locale ? locale : this.localeId;
    return this.getTagLabel(value, localeId);
  }

  getTagLabel(tag: Tag, localeId: supportedLocales): string {
    const label = tag[localeId];
    if (label) {
      return label;
    }

    const fallback = tag[tag.fallback_language];
    if (fallback) {
      return fallback;
    }

    return '';
  }

}
