"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircleIcon, SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  placeholder?: string;
  search?: string;
}

export const SearchBar = ({ placeholder = "Search...", search }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [query, setQuery] = useState(search || "");

  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [query]);

  // Keep query state in sync with URL param
  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  // Debounced update to URL when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      params.delete("page");

      // Build a clean URL with pathname + query string
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 50);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex items-center relative justify-between">
      <Input
        className="peer ps-9 pe-9"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        {isLoading ? (
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            role="status"
            aria-label="Loading..."
          />
        ) : (
          <SearchIcon size={16} aria-hidden="true" />
        )}
      </div>
      {query && (
        <Button
          size="icon"
          variant={"ghost"}
          className="absolute right-1"
          onClick={() => setQuery("")}
        >
          <X />
        </Button>
      )}
    </div>
  );
};
