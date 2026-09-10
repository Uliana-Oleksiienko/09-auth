import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { HOME_PAGE_URL, OG_IMAGE, SITE_NAME } from "@/constants";
import { fetchNotes } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const pageTitle = tag
    ? `Notes filtered by "${tag}" | NoteHub`
    : "All Notes | NoteHub";

  const pageDescription = tag
    ? `View all notes tagged with "${tag}" in NoteHub. Easily browse and manage your categorized notes.`
    : "Browse all your notes in NoteHub — a simple and efficient way to stay organized.";

  const pageUrl = tag
    ? `${HOME_PAGE_URL}/notes/filter/${tag}`
    : `${HOME_PAGE_URL}/notes/filter/all`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
    },
  };
}

const FilterNotes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  const searchQuery = "";
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default FilterNotes;