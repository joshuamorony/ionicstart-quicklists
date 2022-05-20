export interface ChecklistItem {
  title: string;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}
