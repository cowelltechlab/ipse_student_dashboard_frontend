export interface ClassesBase {
    id: number
    name: string
    type: string
}

export interface ClassType extends ClassesBase {
    term: string;
}

export interface ClassSelectionType {
  classId: number,
  classGoal: string
}
