export interface ReflectionCreation {
  dayId: string;
  feelingInt: number;
  notes: string;
}

export interface DayCreation {
  userId: string;
  word: string;
  notes: string;
}

export interface Feeling {
  id: number;
  feeling: string;
}

export interface Reflection {
  id: string;
  feeling?: Feeling;
  feelingInt: number;
  notes: string;
  dayId: string;
}

export interface Intent {
  id: string;
  notes: string;
  word: string;
}

export interface Day {
  Intent: Intent[];
  Reflection: Reflection[];
  date: string;
  id: string;
  userId: string;
}
