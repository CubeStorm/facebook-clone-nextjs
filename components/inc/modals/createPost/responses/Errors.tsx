import { ApiError } from '@components/inc/ApiError';
import { ValidationError } from '@components/inc/ValidationError';

import Axios from 'axios';

interface ErrorsProps {
    error: unknown;
}

export const Errors = ({ error }: ErrorsProps) => {
    if (Axios.isAxiosError(error)) {
        const contentTooLarge = error.message.includes('413');

        return contentTooLarge ? (
            <span className="text-sm text-red-400 font-medium">Your content is too large</span>
        ) : (
            <ApiError />
        );
    }

    if (error) {
        return <></>;
    }

    return (
        <section data-testid="post-validation" className="w-full mb-3 p-3">
            <ValidationError fieldName="content" />
            <ValidationError fieldName="images" />
        </section>
    );
};
