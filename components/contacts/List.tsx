import * as React from 'react';
import { memo } from 'react';
import { useFriends } from '@hooks/useFriends';

import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';
import { LoadMore } from '@components/contacts/shared/LoadMore';
import { Slot } from '@components/contacts/Slot';
import { Loader } from '@components/contacts/shared/Loader';

import { ListType } from '@enums/ListType';

interface ListProps {
	userId: number;
}

export const List = memo(({ userId }: ListProps) => {
	const { friends, isInitialLoading, isLoading, isError, isReachingEnd, loadMore } = useFriends(
		ListType.FRIENDS,
		userId
	);

	if (isInitialLoading) return <Loader />;
	if (isError) return <ApiError isSmall />;
	if (!friends || !!!friends.length) return <EmptyList title="No contacts, add some friends!" />;

	const slots = friends.map(friend => <Slot key={friend.id} {...friend} />);

	return (
		<div data-testid="contacts-list" className="w-full">
			{slots}

			{isReachingEnd || <LoadMore isLoading={isLoading} callback={loadMore} />}
		</div>
	);
});

List.displayName = 'List';
