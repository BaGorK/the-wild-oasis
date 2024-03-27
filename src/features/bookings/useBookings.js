import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };
  // { field: 'totalPrice', value: 7000, method: 'gte' };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const { data: bookings, count } = data;

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });

  return { isLoading, bookings, error, count };
}
