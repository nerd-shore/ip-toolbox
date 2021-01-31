export interface DomObject {
  elementType: 'DIV' | 'STRONG' | 'IMG' | 'EM' | 'H1' | 'H2' | 'H3' | 'BR' | 'A' | 'I' | 'B';
  value: string | null;
  elements?: DomObject[] | null,
  attributes?: any | null
}
