import { configureStore } from '@reduxjs/toolkit';
import {useGetPostsQuery} from '../api/redditAPI';
import redditReducer, {setPosts, setCurrentSubreddit, setSearchTerm} from './redditSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
jest.mock('../api/redditAPI');

describe('store integration tests', () => {

    let store;

    beforeEach(() => {
        jest.resetAllMocks();
        store = configureStore({
            reducer: {
                reddit: redditReducer
            }
        });

        setupListeners(store.dispatch);
    });

    it('should store the array of current subreddit posts in state when setPosts is dispatched', () => {
        expect(store.getState().reddit.posts).toEqual([]);

        const mockResponse = {
            data: [{
                id: 'o1np6164',
                title: 'title1',
                author: 'author1',
                num_comments: 5
            }, {
                id: 'b1526pon',
                title: 'title2',
                author: 'author2',
                num_comments: 20
            }],
            error: undefined,
            isLoading: false
        };

        useGetPostsQuery.mockReturnValueOnce(mockResponse);
        const {data} = useGetPostsQuery('subreddit');
        store.dispatch(setPosts(data));

        expect(store.getState().reddit.posts).toEqual(data);
    });

    it('should store the current subreddit in state when setCurrentSubreddit is dispatched', () => {
        expect(store.getState().reddit.currentSubreddit).toEqual('/r/Home');

        store.dispatch(setCurrentSubreddit('/r/Pets'));

        expect(store.getState().reddit.currentSubreddit).toEqual('/r/Pets');
    });

    it('should store the current search term in state when setSearchTerm is dispatched', () => {
        expect(store.getState().reddit.searchTerm).toEqual('');

        store.dispatch(setSearchTerm('Ginger'));

        expect(store.getState().reddit.searchTerm).toEqual('Ginger');
    });
});