import * as React from 'react';
import { useState, useEffect } from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { RequestActions } from '@components/pages/friends/RequestActions';

import axios from '@lib/axios';

import type { NextPage } from 'next';


const Requests: NextPage = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios.get('/api/requests')
            .then(response => setRequests(response.data.requests))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);


    const RequestsComponents = requests.map(({ id, inviter }) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${inviter.first_name} ${inviter.last_name}`}
            profile_image={inviter.profile_image}
        >
            <RequestActions />
        </User>
    ));

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Requests" />

                <div className="flex flex-col gap-2">
                    {isLoading
                        ? <Loader />
                        : RequestsComponents.length > 0
                            ? RequestsComponents
                            : <EmptyList title="Your list of requests is empty" />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Requests;
