export interface ClassesBase {
    id: number
    name: string
    type: string
}

export interface ClassType extends ClassesBase {
    term: string;
}

export interface ClassSelectionType {
  class_id: number,
  class_goal: string
}


export interface StudentClassType {
  class_id: string
  class_name: string,
  class_goal: string
}