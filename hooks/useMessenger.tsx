import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';

import type { MessengerContactType } from '@ctypes/features/MessengerContactType';

export const useMessenger = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isReachedEnd, setIsReachedEnd] = useState(false);

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		return `/api/messenger?page=${++pageIndex}`;
	};

	const fetcher = async (url: string) => {
		setIsLoading(true);

		return await axios
			.get(url)
			.then(response => {
				let data = response.data.paginator.data;

				if (!Array.isArray(data)) {
					data = [...Object.values(data)];
				}

				return data;
			})
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	// Fetching data
	const { data, size, setSize } = useSWRInfinite<MessengerContactType[]>(getKey, fetcher);

	useEffect(() => {
		if (!data) return;

		setIsLoading(false);

		const isEmpty = data[0].length === 0;
		setIsReachedEnd(isEmpty || (data && data[data.length - 1].length < 10));
	}, [data]);

	const loadMore = () => {
		setIsLoading(true);
		setSize(size + 1);
	};

	return {
		contacts: [...(data?.flat() ?? [])],
		isLoading,
		isError,
		isReachedEnd,
		loadMore,
	};
};