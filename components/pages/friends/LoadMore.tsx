import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


interface LoadMoreProps {
    callback: () => void
}

export const LoadMore: React.FC<LoadMoreProps> = ({ callback }) => {
    return (
        <button
            className="flex justify-center items-center gap-5 hover:bg-dark-100 active:opacity-20 rounded-lg transition-colors cursor-pointer mt-3 py-3 px-5"
            onClick={callback}
        >
            <span className="text-3xl text-light-200 font-medium">
                <FontAwesomeIcon icon={faArrowDown} />
            </span>
        </button>
    );
}