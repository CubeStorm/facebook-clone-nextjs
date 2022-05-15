import { configureStore } from '@reduxjs/toolkit';

import NavReducer from '@redux/slices/NavSlice';
import SidebarReducer from '@redux/slices/SidebarSlice';
import ChatReducer from '@redux/slices/ChatSlice';
import MessengerReducer from '@redux/slices/MessengerSlice';
import NotificationsListReducer from '@redux/slices/NotificationsListSlice';
import CreatePostModalReducer from '@redux/slices/CreatePostModalSlice';

export const generateStore = () =>
    configureStore({
        reducer: {
            nav: NavReducer,
            sidebar: SidebarReducer,
            chat: ChatReducer,
            messenger: MessengerReducer,
            notificationsList: NotificationsListReducer,
            createPostModal: CreatePostModalReducer,
        },
    });

export const store = generateStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
