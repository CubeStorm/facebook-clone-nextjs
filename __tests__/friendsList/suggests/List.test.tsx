import { screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import RootUserJson from '@mocks/user/root.json';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import SuggestsSecondPageJson from '@mocks/friendsList/suggests/secondPage.json';
import SuggestsEmptyPageJson from '@mocks/friendsList/suggests/empty.json';
import { List } from '@components/pages/friends/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Pokes list', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('fetch button dissapears when page fetched all suggests', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=2')
            .reply(200, SuggestsEmptyPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        expect(fetchMoreButton).not.toBeInTheDocument();
    });

    it('shows loaders on initial fetching users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .delay(99999)
            .reply(200, SuggestsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads 10 users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        const firstElement = await screen.findByText(SuggestsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=2')
            .reply(200, SuggestsFirstPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=2')
            .reply(200, SuggestsSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(SuggestsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(SuggestsSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(SuggestsSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/friendship/suggests?page=1').reply(200, []);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/friendship/suggests?page=1').reply(500);

        renderWithDefaultData(<List userId={RootUserJson.id} type="suggests" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});