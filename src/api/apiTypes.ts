export default interface Collection {
    id: string;
    name: string;
    description: string;
  }

  export interface FieldSchema {
    type: 'String' | 'Boolean' | 'Date' | 'Number' | 'Decimal' | 'ObjectId' | 'Array' | 'Mixed' | 'Secret';
    required?: boolean;
    unique?: boolean;
    enum?: string[]; // For fields with specific allowed values
    ref?: string; // For ObjectId references
    min?: number; // For numeric fields
    max?: number; // For numeric fields
    default?: any; // Default value
    contentDef?: FieldSchema | Record<string, FieldSchema>; // Schema definition for array elements or nested fields
  }
