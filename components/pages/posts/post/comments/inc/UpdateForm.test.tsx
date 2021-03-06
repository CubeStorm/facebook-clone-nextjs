import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { UpdateForm } from '@components/pages/posts/post/comments/inc/UpdateForm';
import { mock } from '@libs/nock';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';

describe('UpdateForm component', () => {
    jest.setTimeout(30000);
    const user = userEvent.setup();
    const mockCloseEditMode = jest.fn();
    const commentContent = 'Comment to update';

    beforeEach(() => {
        mock('/api/posts/1/comments?page=1', 200, CommentsFirstPageJson);
    });

    it('can typing on input', async () => {
        renderWithDefaultData(
            <UpdateForm postId={1} commentId={1} content={commentContent} closeEditMode={mockCloseEditMode} />
        );

        const input = screen.getByLabelText('Update comment');
        await user.type(input, ' edited');

        expect(input).toHaveValue(`${commentContent} edited`);
    });

    it('"Comment must be at least 2 characters" validation error', async () => {
        renderWithDefaultData(
            <UpdateForm postId={1} commentId={1} content={commentContent} closeEditMode={mockCloseEditMode} />
        );

        const input = screen.getByLabelText('Update comment');
        await user.clear(input);
        await user.type(input, 'a');

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at least 2 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must contain text" validation error', async () => {
        renderWithDefaultData(
            <UpdateForm postId={1} commentId={1} content={commentContent} closeEditMode={mockCloseEditMode} />
        );

        const input = screen.getByLabelText('Update comment');
        await user.clear(input);

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must contain text');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must be at most 1000 characters" validation error', async () => {
        renderWithDefaultData(
            <UpdateForm postId={1} commentId={1} content={commentContent} closeEditMode={mockCloseEditMode} />
        );

        const input = screen.getByLabelText('Update comment');
        await user.clear(input);
        await user.type(
            input,
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        );

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at most 1000 characters');

        expect(validationError).toBeInTheDocument();
    });
});
