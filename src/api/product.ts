import useSWR from 'swr';
import { ReactNode, useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { fetcherDemo, endpointsDemo } from 'src/utils/axiosDemo';
import { fetcherVercel, endpointsVercel } from 'src/utils/axiosVercel';
import { fetcherMacMini, endpointsMacMini } from 'src/utils/axiosMacMini';
import { IProductItem } from 'src/types/product';
import { ITutorItem } from 'src/types/tutor';
import { _productNames } from 'src/_mock/assets';
// hesitate
// ----------------------------------------------------------------------

export function useGetRandomTutors() {
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
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRandomTutorsVercel() {
  const URL = endpointsVercel.randomuserVercel.root;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcherDemo);

  const memoizedValue = useMemo(
    () => ({
      randomtutors: (data?.results as ITutorItem[]) || [],
      randomtutorsLoading: isLoading,
      randomtutorsError: error,
      randomtutorsValidating: isValidating,
      randomtutorsEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRandomTutorsMacMini() {
  const URL = endpointsMacMini.randomuserMacMini.root;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcherMacMini);

  const memoizedValue = useMemo(
    () => ({
      randomtutors: (data?.results as ITutorItem[]) || [],
      randomtutorsLoading: isLoading,
      randomtutorsError: error,
      randomtutorsValidating: isValidating,
      randomtutorsEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
export function useGetProducts() {
  //const URL = 'https://api-dev-minimal-v620.pages.dev/api/product/list';
  const URL = endpoints.product.list;
  const { randomtutors } = useGetRandomTutors();
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  // 用 useMemo 產生新陣列，避免直接 mutate data
  const memoizedProducts = useMemo(() => {
    if (!data || !Array.isArray(data.products)) return [];
    // 用 map 產生新陣列，並安全地加上 randomtutors
    return data.products.map((product: IProductItem, idx: number) => ({
      ...product,
      randomtutors: randomtutors?.[idx], // 若 randomtutors 長度不足會是 undefined
    }));
  }, [data, randomtutors]);

  return {
    products: memoizedProducts,
    productsLoading: isLoading,
    productsError: error,
    productsValidating: isValidating,
    productsEmpty: !isLoading && !memoizedProducts.length,
  };
}

// ----------------------------------------------------------------------
export function useGetProductsOrigin() {
  //const URL = endpoints.product.list;
  const URL = 'https://api-dev-minimal-v620.pages.dev/api/product/list';
  const { randomtutors } = useGetRandomTutors();

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  if (data && Array.isArray(data.products)) {
    for (let i = 0; i < data.products.length; i + 1) {
      data.products[i].randomtutors = randomtutors[i];
    }
  }

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

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

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
  const URL = query ? [endpointsVercel.randomuserVercel.root, { params: { query } }] : '';
  //const URL = endpointsVercel.randomuserVercel.root;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcherVercel, {
    keepPreviousData: true,
  });

  //const URL = endpointsVercel.randomuserVercel.root;
  //const { data, isLoading, error, isValidating } = useSWR(URL, fetcherVercel);

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.products as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !(data?.results && data.results.length > 0),
    }),
    [data?.products, data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProductsOrigin(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : '';
  const { randomtutors } = useGetRandomTutors();

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  let searchIndex: number[] | undefined = query ? searchProductIndex(query) : undefined;
  searchIndex = query ? searchProductIndex(query) : undefined;

  if (data && searchIndex && Array.isArray(data.results)) {
    for (let i = 0; i < data.results.length; i++) {
      data.results[i].randomtutors = randomtutors[searchIndex[i]];
    }
  }
  console.log(`Wow ${JSON.stringify(data)}`);

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

  function searchProductIndex(query: string): number[] {
    // 將搜尋字串轉換為小寫，方便不區分大小寫的比較
    const queryLowerCase = query.toLowerCase();

    // 篩選出包含搜尋字串的產品，並返回其索引
    return _productNames.reduce((result: number[], product: string, index: number) => {
      if (product.toLowerCase().includes(queryLowerCase)) {
        result.push(index);
      }
      return result;
    }, []);
  }

  return memoizedValue;
}
