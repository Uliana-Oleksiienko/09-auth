import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";
import { NOTES_PER_PAGE } from "@/constants";
import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CheckSessionRequest {
  success: boolean;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
  perPage: number = NOTES_PER_PAGE
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search ? { search } : {}),
      page,
      tag,
      perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<
  AxiosResponse<CheckSessionRequest>
> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};