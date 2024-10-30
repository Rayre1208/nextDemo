import useSWR from 'swr';
import { ReactNode, useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { fetcherDemo, endpointsDemo } from 'src/utils/axiosDemo';
import { IProductItem } from 'src/types/product';
import { ITutorItem } from 'src/types/tutor';

// hesitate
// ----------------------------------------------------------------------

export function useGetRamdomTutors() {
  const URL = endpointsDemo.randomuser.users20;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcherDemo);

  const memoizedValue = useMemo(
    () => ({
      randomtutors: (data?.results as ITutorItem[]) || [],
      randomtutorsLoading: isLoading,
      randomtutorsError: error,
      randomtutorsValidating: isValidating,
      randomtutorsEmpty: !isLoading && !data?.results.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: (data?.products as IProductItem[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : '';

  const { randomtutors } = useGetRamdomTutors();

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  if (data && Array.isArray(data.product)) {
    for (let i = 0; i < data.product.length; i++) {
      data.product[i].randomtutors = randomtutors[i];
    }
  }

  const memoizedValue = useMemo(
    () => ({
      product: data?.product as IProductItem,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : '';

  const { randomtutors } = useGetRamdomTutors();

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  if (data && Array.isArray(data.results)) {
    for (let i = 0; i < data.results.length; i++) {
      data.results[i].randomtutors = randomtutors[i];
    }
  }

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
