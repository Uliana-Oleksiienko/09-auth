"use client";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

interface FilterPageClientProps {
  category?: string | undefined;
}

export default function FilterPageClient({ category }: FilterPageClientProps) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, query, category], 
    queryFn: () => fetchNotes(currentPage, query, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Sorry, something went wrong, please try again");
    }
  }, [isError]);

  const changeQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 1000);

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;
  const showPagination = totalPages > 1 && notes.length > 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />

        
        {!isLoading && showPagination && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}

        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>

      <Toaster position="top-right" reverseOrder={false} />

      {isLoading && <p className={css.loading}>Loading, please wait...</p>}
      {isError && <p className={css.error}>There was an error, please try again...</p>}

      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isSuccess && notes.length === 0 && (
        <p className={css.placeholder}>
          {query
            ? `No notes found for "${query}"`
            : category && category !== "all"
            ? `No notes with tag "${category}"`
            : "No notes yet. Create your first note!"}
        </p>
      )}
    </div>
  );
}