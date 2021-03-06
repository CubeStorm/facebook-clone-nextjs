import { useEffect, useRef } from 'react';
import { useComments } from '@hooks/useComments';

import { Formik } from 'formik';
import { Errors } from '@components/pages/posts/post/comments/inc/Errors';
import { SubmitButton } from '@components/pages/posts/post/comments/create/inc/SubmitButton';

import { clsx } from 'clsx';
import { CommentSchema } from '@validation/CommentSchema';

import type { FormikProps } from 'formik';
import type { ICommentPayload } from '@utils/types';

interface CreateFormProps {
    postId: number;
    reloadComments: () => void;
}

export const CreateForm = ({ postId, reloadComments }: CreateFormProps) => {
    const formRef = useRef<FormikProps<ICommentPayload>>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { state, createComment } = useComments();

    useEffect(() => {
        if (!inputRef.current) return;

        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (state.status === 'LOADING') return;

        if (state.status === 'SUCCESS') {
            if (!formRef.current) return;

            reloadComments();
            formRef.current.resetForm();
        }
    }, [state, reloadComments]);

    return (
        <Formik
            innerRef={formRef}
            initialValues={{ content: '', resource_id: postId }}
            validationSchema={CommentSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={createComment}
        >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <form className="w-full" onSubmit={handleSubmit}>
                    <div
                        className={clsx(
                            'w-full flex justify-between items-center bg-dark-100 text-light-200 rounded-3xl focus:outline-none py-2 px-4',
                            (state.status === 'ERROR' || errors.content) && 'border-[1px] border-red-400'
                        )}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            aria-label="Write a comment"
                            name="content"
                            disabled={state.status === 'LOADING'}
                            value={values.content}
                            placeholder="Write a comment..."
                            className={clsx(
                                'w-full bg-transparent focus:outline-none',
                                state.status === 'LOADING' && 'cursor-progress'
                            )}
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <SubmitButton isLoading={state.status === 'LOADING'} callback={handleSubmit} />
                    </div>

                    <Errors error={state.status === 'ERROR' && state.error} />
                </form>
            )}
        </Formik>
    );
};
