import removeSearchPrefix from 'common/utils/removeSearchPrefix';
import DEFAULT_PAGINATION_OPTIONS from 'common/constants/paginationOptions';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useIsMobile from 'common/hooks/useIsMobile';
import { FetchNextPageOptions, FetchPreviousPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

type HandlePaginationState = {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>> | null;
  fetchPreviousPage: (
    options?: FetchPreviousPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>> | null;
};

interface PaginationProps {
  searchPrefix?: string;
}

const usePagination = (props?: PaginationProps) => {
  const [paginationOptions, setPaginationOptions] = React.useState(DEFAULT_PAGINATION_OPTIONS);
  const [search, setSearch] = React.useState('');
  const [handlePagination, setHandlePagination] = React.useState<HandlePaginationState>({
    fetchNextPage: () => null,
    fetchPreviousPage: () => null,
  });
  const { ref: loadMoreRef, inView } = useInView();
  const isMobile = useIsMobile();

  const onTablePageChange = (pageIndex: number) => {
    if (pageIndex === paginationOptions.page) return;
    if (pageIndex > paginationOptions.page) {
      setPaginationOptions(prev => ({ ...prev, page: pageIndex }));
      handlePagination.fetchNextPage();
    } else {
      setPaginationOptions(prev => ({ ...prev, page: pageIndex }));
      handlePagination.fetchPreviousPage();
    }
  };

  const handlePageSizeChange = (perPage: number) => {
    setPaginationOptions({ page: 0, perPage });
  };

  const handleSearch = async (searchResult: string) => {
    const formattedSearch = removeSearchPrefix(searchResult, props?.searchPrefix);
    setSearch(formattedSearch);
    setPaginationOptions({ page: DEFAULT_PAGINATION_OPTIONS.page, perPage: paginationOptions.perPage });
  };

  useEffect(() => {
    if (inView && isMobile) {
      setPaginationOptions(prev => ({ ...prev, page: prev.page + 1 }));
      handlePagination.fetchNextPage();
    }
  }, [handlePagination, handlePagination.fetchNextPage, inView, isMobile]);

  useEffect(() => {
    // Reset pagination option when viewport changes
    setPaginationOptions(DEFAULT_PAGINATION_OPTIONS);
  }, [isMobile]);

  return {
    paginationOptions,
    setPaginationOptions,
    loadMoreRef,
    search,
    handleSearch,
    handlePageSizeChange,
    setHandlePagination,
    onTablePageChange,
  };
};

export default usePagination;
