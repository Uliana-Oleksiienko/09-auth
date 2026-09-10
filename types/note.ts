import { NOTE_TAGS } from "@/constants";

export type NoteTag = (typeof NOTE_TAGS)[number];
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}