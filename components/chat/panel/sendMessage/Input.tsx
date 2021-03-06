import { useLayoutEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

import clsx from 'clsx';

type MessageForm = {
    text: string;
};

export const Input = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { values, handleBlur, handleChange } = useFormikContext<MessageForm>();

    useLayoutEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input
            ref={inputRef}
            aria-label="Message input"
            type="text"
            name="text"
            placeholder="Aa"
            value={values.text}
            autoComplete="off"
            className={clsx(
                'h-9 bg-dark-100 text-light-100 transition-width focus:outline-none rounded-[20px] px-3',
                !!values.text.length && 'w-52',
                !!!values.text.length && 'w-36'
            )}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};
