import Image from 'next/image';

interface ApiErrorProps {
    isSmall?: boolean;
    styles?: string;
}

export const ApiError = ({ isSmall = false, styles = '' }: ApiErrorProps) => {
    return (
        <div className={`w-full flex flex-col justify-center items-center mt-12 ${styles}`}>
            <Image
                width={isSmall ? '100' : '150'}
                height={isSmall ? '100' : '150'}
                src="/img/not_available.svg"
                alt="Server error"
            />

            <span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-light-100 text-center font-medium mt-5`}>
                Something went wrong
            </span>

            <span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-light-100 text-center font-medium`}>
                Please try again later
            </span>
        </div>
    );
};