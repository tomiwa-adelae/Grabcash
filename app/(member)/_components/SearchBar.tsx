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

  // Format numbers with commas for display
  const formatWithCommas = (value: string) => {
    if (!/^\d+$/.test(value.replace(/,/g, ""))) return value; // leave text untouched
    return Number(value.replace(/,/g, "")).toLocaleString();
  };

  // Keep query in sync with URL param
  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    if (urlQuery) {
      // Format numeric values with commas on load
      setQuery(formatWithCommas(urlQuery));
    } else {
      setQuery("");
    }
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

  // Debounced update to URL when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        const sanitized = query.replace(/,/g, ""); // strip commas
        params.set("query", sanitized);
      } else {
        params.delete("query");
      }

      params.delete("page");

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Keep commas for numbers, leave strings alone
    if (/^\d{1,3}(,\d{3})*$/.test(raw) || /^\d+$/.test(raw)) {
      setQuery(formatWithCommas(raw));
    } else {
      setQuery(raw);
    }
  };

  return (
    <div className="flex items-center relative justify-between">
      <Input
        className="peer ps-9 pe-9"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
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
