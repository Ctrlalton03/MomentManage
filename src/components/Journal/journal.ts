export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
  userId: string;
}

export interface NewEntryData {
  title: string;
  content: string;
  mood: string;
  id?: string;
}

  export interface Entry {
    id: string
    title: string
    content: string
    mood: string
    createdAt: string
  }