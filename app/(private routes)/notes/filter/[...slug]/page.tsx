import { fetchNotes } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FilterPageClient from "./Notes.client";
import { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}
interface GenerateMetadataProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === "all" ? "all" : slug[0];
  return {
    title: `NoteHub`,
    description: `Notes within the category ${category}`,
    openGraph: {
      title: `NoteHub`,
      description: `Notes within the category ${category}`,
      url: `https://notehub.com/notes/filter/${category}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://i.ibb.co/hRmh19Gt/Note-Hub-green.png",
          width: 1200,
          height: 630,
          alt: `Notes within the category ${category}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const query = "";
  const currentPage = 1;

  const queryClient = new QueryClient();
  
  
  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, query, category],
    queryFn: () => fetchNotes(currentPage, query, category), 
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterPageClient category={category} />
    </HydrationBoundary>
  );
}