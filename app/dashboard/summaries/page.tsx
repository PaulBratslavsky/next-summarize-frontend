import RenderList from "@/components/custom/RenderList";
import { LinkCard } from "@/components/custom/LinkCard";
import { getSummaries } from "@/data/loaders";
import { Search } from "@/components/custom/Search";
import { PaginationComponent as Pagination } from "@/components/custom/Pagination";

import { Suspense } from "react";
import { LoadingSpinnerFull } from "@/components/custom/LoadingSpinnerFull";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function SummariesRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const { data, meta } = await getSummaries(currentPage, query);

  const pageCount = meta.pagination.pageCount;

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <Suspense fallback={<LoadingSpinnerFull />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <RenderList data={data} component={LinkCard} />
        </div>
      </Suspense>
      <Pagination pageCount={pageCount} />
    </div>
  );
}
