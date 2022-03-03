import * as React from 'react';
import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';

import Image from 'next/image';

import { toggleActive } from '@redux/slices/ChatSlice';

import type { UserType } from '@ctypes/features/UserType';

interface SlotProps extends UserType {}

export const Slot = memo<SlotProps>(({ id, first_name, last_name, profile_image, background_image }) => {
	const dispatch = useAppDispatch();

	const handleOpenChat = () => dispatch(toggleActive({ id, first_name, last_name, profile_image, background_image }));

	return (
		<div
			className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2"
			onClick={handleOpenChat}
		>
			<Image
				width="36"
				height="36"
				src={profile_image}
				alt={`${first_name} ${last_name}`}
				className="rounded-full"
			/>

			<span className="text-light-200 font-medium leading-5 m-0">
				{first_name} {last_name}
			</span>
		</div>
	);
});

Slot.displayName = 'Slot';
