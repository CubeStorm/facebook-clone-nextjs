import { useFormikContext } from 'formik';

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SubmitButton = () => {
    const { handleSubmit } = useFormikContext();

    return (
        <RoundedButton
            type="submit"
            name="Send message"
            icon={faCircleCheck}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={handleSubmit}
        />
    );
};
