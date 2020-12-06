import { Tag } from 'src/app/model/tag.interface';
import { TagLabelPipe } from './tag-label.pipe';

const defaultTag: Tag = {
  id: "4e01f25c-c664-11e9-95f3-06be5d993516",
  user_id: null,
  type: "floor",

  de_DE: "Außenbereich",
  en_US: "Outdoor area",
  es_ES: "Zona exterior",
  fr_FR: "Partie extérieure",
  it_IT: "Area esterna",
  fallback_language: "en_US",

  updated_at: "2019-08-24 11:42:51",
  created_at: "2019-08-24 11:42:51",
  deleted_at: null,
}

const englishTag: Tag = {
  id: "4e01f25c-c664-11e9-95f3-06be5d993516",
  user_id: null,
  type: "floor",

  de_DE: null,
  en_US: "Outdoor area",
  es_ES: "",
  fr_FR: "",
  it_IT: "",
  fallback_language: "en_US",

  updated_at: "2019-08-24 11:42:51",
  created_at: "2019-08-24 11:42:51",
  deleted_at: null,
}

describe('TagLabelPipe', () => {
  const pipe = new TagLabelPipe('de_DE');

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the default (german) label', () => {
    expect(pipe.transform(defaultTag)).toBe("Außenbereich");
  });

  it('should return the french label', () => {
    expect(pipe.transform(defaultTag, 'fr_FR')).toBe("Partie extérieure");
  });

  it('should return the fallback (en_US) label', () => {
    const fallbackText = englishTag[englishTag.fallback_language] as string;
    expect(pipe.transform(englishTag)).toBe(fallbackText);
  });
});
