import RenderList from "@/components/custom/RenderList";
import { NoteCardLink } from "@/components/custom/NoteCardLink";
import { PaginationComponent as Pagination } from "@/components/custom/Pagination";
import { getNotesByVideoId } from "@/data/loaders";
import { Search } from "@/components/custom/Search";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function NotesRoute({ searchParams, params }: Readonly<SearchParamsProps> & { params: { videoId: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const { data, meta } = await getNotesByVideoId(params.videoId, currentPage, query);
  const pageCount = meta.pagination.pageCount;

  return (
    <div className="grid grid-cols-1 gap-4">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RenderList data={data} component={NoteCardLink} />
      </div>
      <Pagination pageCount={pageCount} />
    </div>
  );
}
