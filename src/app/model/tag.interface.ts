export type supportedLocales = 'de_DE' | 'en_US' | 'es_ES' | 'fr_FR' | 'it_IT';

export interface Tag {
  id: string;
  user_id: string | null;
  company_id?: string | null;

  type: string;
  de_DE: string | null;
  en_US: string | null;
  es_ES: string | null;
  fr_FR: string | null;
  it_IT: string | null;
  fallback_language: supportedLocales;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
