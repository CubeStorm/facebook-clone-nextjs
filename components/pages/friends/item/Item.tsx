import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';
import { Actions } from '@components/pages/friends/item/actions/Actions';

import type { IFriendsListItem, IFriendsList } from '@utils/types';

interface ItemProps extends IFriendsListItem {
    type: IFriendsList;
}

export const Item = ({ friend, data, type }: ItemProps) => {
    const { id, name, profile_image } = friend;

    return (
        <Link href={`/profile/${id}`}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Avatar size={85} src={profile_image} alt={name} />

                <span className="md:text-xl text-light-200 font-medium">{name}</span>

                <div className="ml-auto">
                    <Actions friend={friend} data={data} listType={type} />
                </div>
            </a>
        </Link>
    );
};
