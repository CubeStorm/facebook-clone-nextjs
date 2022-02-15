import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import axios from '@lib/axios';
import { AuthMiddleware } from '@enums/AuthMiddleware';

import type { UserType } from '@ctypes/features/UserType';


export const useAuth = (middleware: AuthMiddleware | void) => {
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const { push } = useRouter();

    const { data: user, error, mutate } = useSWR<UserType>('/api/user', () =>
        axios.get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;

                push('/verify-email');
            })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors }) => {
        setIsRequestLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/register')
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(Object.values(error.response.data.errors).flat());
            })
            .finally(() => setIsRequestLoading(false));
    }

    const login = async ({ setErrors, ...props }) => {
        setIsRequestLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setIsRequestLoading(false));
    }

    const logout = async () => {
        if (!error) {
            setIsRequestLoading(true);

            await axios.post('/logout');
            mutate();

            setIsRequestLoading(false);
        }

        window.location.href = '/login';
    }

    useEffect(() => {
        if (middleware === AuthMiddleware.GUEST && user) push('/');
        if (middleware === AuthMiddleware.AUTH && error) logout();
    }, [user, error])

    return {
        user,
        isRequestLoading,
        register,
        login,
        logout
    }
}