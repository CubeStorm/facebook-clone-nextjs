import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@components/pages/friends/inc/Loader';

interface LoadMoreProps {
    isLoading: boolean;
    callback: () => void;
}

export const LoadMore = ({ isLoading, callback }: LoadMoreProps) => {
    if (isLoading) return <Loader testId="friendsList-fetching_loader" />;

    return (
        <button
            title="Fetch more users"
            aria-label="Fetch more users"
            className="w-full flex justify-center items-center gap-5 hover:bg-dark-100 active:opacity-20 rounded-lg transition-colors cursor-pointer mt-3 py-3 px-5"
            onClick={callback}
        >
            <span className="text-3xl text-light-200 font-medium">
                <FontAwesomeIcon icon={faArrowDown} />
            </span>
        </button>
    );
};
