export interface DomObject {
  elementType: 'div' | 'strong' | 'img' | 'em' | 'h1' | 'h2' | 'h3' | 'br';
  value: string | null;
  elements?: DomObject[] | null,
  attributes?: any | null
}
