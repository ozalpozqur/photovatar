import Button from "@/components/Button";
import { useEffect, useMemo } from "react";
import { PaginateData } from "@/types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";

interface PaginationProps {
  onPageChange?: () => void;
  paginateData?: PaginateData;
}
export default function Pagination({ onPageChange, paginateData }: PaginationProps) {
  const { query, push } = useRouter();

  useEffect(() => {
    onPageChange?.();
  }, [query]);

  const nextPage = useMemo(() => {
    return generatePageNumber(1);
  }, [query, paginateData]);

  const prevPage = useMemo(() => {
    return generatePageNumber(-1);
  }, [query, paginateData]);

  const setPage = async (page: number) => {
    await push({ query: { ...query, page } });
  };

  function generatePageNumber(amount: -1 | 1) {
    const page = query.page ? Number(query.page) : 1;
    return page + amount;
  }

  if (paginateData?.totalPages! <= 1) return null;

  return (
    <section className="flex justify-center gap-1">
      <Button
        size="small"
        variant="white"
        onClick={() => setPage(prevPage)}
        disabled={Boolean(paginateData?.currentPage && paginateData.currentPage === 1)}
        className="disabled:!border-gray-100 !border-gray-100 shadow-none !rounded"
      >
        <MdKeyboardArrowLeft size={15} />
      </Button>
      <div className="h-8 w-12 flex items-center justify-center text-center tabular-nums rounded border border-gray-100 p-0 text-center text-xs font-medium">
        {query.page ?? 1}
      </div>
      <Button
        size="small"
        variant="white"
        onClick={() => setPage(nextPage)}
        disabled={Boolean(paginateData?.totalPages && paginateData.totalPages < nextPage)}
        className="disabled:!border-gray-100 !border-gray-100 shadow-none !rounded"
      >
        <MdKeyboardArrowRight size={15} />
      </Button>
    </section>
  );
}
