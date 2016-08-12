export interface Relationship {
    id: number;
    weight: number;

    // Relationships
    parent_id: number;
    child_id: number;
}