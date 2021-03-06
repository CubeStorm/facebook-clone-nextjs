import { EmptyList as EmptyListComponent } from '@components/inc/EmptyList';

interface EmptyListProps {
    title: string;
}

export const EmptyList = ({ title }: EmptyListProps) => {
    return (
        <div className="w-full h-full flex justify-content items-center -mt-12 my-8">
            <EmptyListComponent title={title} />
        </div>
    );
};
