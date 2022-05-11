import { useState, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@libs/axios';

import type { UsePaginatedDataState } from '@ctypes/UsePaginatedDataState';

const axiosConfig = {
    transformResponse: [
        function (responseData: any) {
            let data = JSON.parse(responseData);

            if (!Array.isArray(data)) {
                data = [...Object.values(data)] as [];
            }

            return data;
        },
    ],
};

export const usePaginatedData = <T>(key: string, perList = 10) => {
    const [state, setState] = useState<UsePaginatedDataState>('LOADING');
    const [flatData, setFlatData] = useState<T[]>([]);
    const AxiosAbortController = useMemo(() => new AbortController(), []);

    const getKey = (pageIndex: number, previousPageData: []) => {
        if (previousPageData && !previousPageData.length) return null;

        return `${key}?page=${++pageIndex}`;
    };

    const fetcher = (url: string) =>
        axios
            .get(url, axiosConfig)
            .then((response) => response.data)
            .catch((error) => {
                if (error.message !== 'canceled') {
                    setState('ERROR');
                }

                throw error;
            });

    const { data, size, setSize, mutate } = useSWRInfinite<T[]>(getKey, fetcher);

    useEffect(() => {
        setState('LOADING');

        return () => AxiosAbortController.abort();
    }, [key, AxiosAbortController]);

    useEffect(() => {
        if (!data) return;

        setFlatData(data.flat());
        setState('SUCCESS');

        return () => AxiosAbortController.abort();
    }, [data, AxiosAbortController]);

    const loadMore = () => {
        setState('FETCHING');
        setSize(size + 1);
    };

    return {
        data: flatData,
        state,
        isEmpty: flatData?.length === 0 || !data,
        isReachedEnd: (flatData?.length === 0 || (data && data[data.length - 1]?.length < perList)) ?? true,
        loadMore,
        reloadData: mutate,
    };
};
