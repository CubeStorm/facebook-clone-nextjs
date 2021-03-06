import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Gallery } from '@components/pages/posts/post/gallery/Gallery';
import PostWithFiveImages from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Gallery component', () => {
    const user = userEvent.setup();

    it('has close button and execute close function when click on it', async () => {
        const mockHandleCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={PostWithFiveImages.images} closeGallery={mockHandleCloseGallery} />);

        const closeButton = screen.getByLabelText('Close gallery');
        expect(closeButton).toBeInTheDocument();

        await user.click(closeButton);

        expect(mockHandleCloseGallery).toBeCalledTimes(1);
    });
});
