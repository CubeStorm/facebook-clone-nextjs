import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { usePosts } from '@hooks/usePosts';

import { Formik, Form as FormikForm } from 'formik';
import { FileDrop } from '@components/inc/modals/createPost/form/fileDrop/FileDrop';
import { Errors } from '@components/inc/modals/createPost/responses/Errors';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { SubmitButton } from '@components/inc/modals/createPost/form/SubmitButton';
import { TextArea } from '@components/inc/modals/createPost/form/TextArea';
import { DropLabel } from '@components/inc/modals/createPost/form/fileDrop/DropLabel';
import { UploadedFiles } from '@components/inc/modals/createPost/form/fileDrop/UploadedFiles';

import { closeModal } from '@redux/slices/CreatePostModalSlice';
import { PostSchema } from '@validation/PostSchema';

import type { IPostPayload } from '@utils/types';

export const Form = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);
    const [oldData, setOldData] = useState<IPostPayload>({ content: '', images: [] });
    const dispatch = useAppDispatch();
    const { state, isLoading, create } = usePosts();

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        dispatch(closeModal());
    }, [state, dispatch]);

    const handleClose = () => setIsUploadActive(false);
    const handleChangeUploadIsActive = () => setIsUploadActive((prevState) => !prevState);

    const handleSubmit = (values: IPostPayload) => {
        create(values);
        setOldData(values);
    };

    if (isLoading) return <SpinnerLoader testid="createPost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <Formik
            initialValues={{ content: oldData.content, images: oldData.images }}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur }) => (
                <FormikForm className="m-3">
                    <TextArea handleChange={handleChange} handleBlur={handleBlur} value={values.content} />

                    {isUploadActive && <FileDrop handleClose={handleClose} />}

                    <UploadedFiles />

                    <Errors error={state.status === 'ERROR' ? state.error : null} />

                    <DropLabel changeUploadActive={handleChangeUploadIsActive} />

                    <SubmitButton isDisabled={isLoading} />
                </FormikForm>
            )}
        </Formik>
    );
};
