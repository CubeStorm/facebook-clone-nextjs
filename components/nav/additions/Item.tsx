import * as React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ItemProps {
    name: string,
    icon: IconDefinition,
    action: () => void,
    dataId: string
}

export const Item: React.FC<ItemProps> = ({ name, icon, action, dataId }) => {
    return (
        <button
            aria-label={name}
            title={name}
            data-test-id={dataId}
            className="w-10 h-10 flex justify-center items-center bg-dark-100 hover:opacity-80 rounded-full p-3"
            onClick={action}
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-lg text-light-50"
            />
        </button>
    );
}