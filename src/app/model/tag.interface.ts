export interface Tag {
  id: string;
  company_id: string;

  type: string;
  fallback_language: 'de_DE' | 'en_US' | 'fr_FR' | 'es_ES' | 'it_IT';
  de_DE: string;
  en_US: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  user_id: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
}
