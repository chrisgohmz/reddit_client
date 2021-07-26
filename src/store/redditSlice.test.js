import {Reducer, Selector} from 'redux-testkit';
import redditReducer, {selectSearchTerm, selectCurrentSubreddit, setPosts, setSearchTerm, setCurrentSubreddit, toggleShowingComments} from './redditSlice.js';

const initialState = {
    posts: [],
    searchTerm: '',
    currentSubreddit: '/r/Home'
};

describe('redditReducer', () => {

    it('should have initial state', () => {
        expect(redditReducer(undefined, {})).toEqual(initialState);
    });

    it('should return the same state after handling a non-existing state', () => {
        Reducer(redditReducer).expect({type: 'NON_EXISTING'}).toReturnState(initialState);
    });

    it('should handle setPosts action on initial state', () => {
        const posts = [{info: 'someInfo'}, {info2: 'someInfo2'}];
        const result = {...initialState, posts: posts};
        const action = setPosts(posts);

        Reducer(redditReducer).expect(action).toReturnState(result);
    });

    it('should handle setPosts action on an existing state', () => {
        const posts = [{info: 'someInfo'}, {info2: 'someInfo2'}];
        const result = {...initialState, posts: posts};
        const action = setPosts(posts);
        const state = {...initialState, posts: [{abcde: 'abcde'}, {zxcvb: 'zxcvb'}]};

        Reducer(redditReducer).withState(state).expect(action).toReturnState(result);
    });

    it('should handle setSearchTerm action on initial state', () => {
        const searchTerm = 'fruits';
        const result = {...initialState, searchTerm: searchTerm};
        const action = setSearchTerm(searchTerm);

        Reducer(redditReducer).expect(action).toReturnState(result);
    });

    it('should handle setSearchTerm action on an existing state', () => {
        const searchTerm = 'fruits';
        const result = {...initialState, searchTerm: searchTerm};
        const action = setSearchTerm(searchTerm);
        const state = {...initialState, searchTerm: 'trees'};

        Reducer(redditReducer).withState(state).expect(action).toReturnState(result);
    });

    it('should handle setCurrentSubreddit action on initial state', () => {
        const subreddit = '/r/Singapore';
        const result = {...initialState, currentSubreddit: subreddit};
        const action = setCurrentSubreddit(subreddit);

        Reducer(redditReducer).expect(action).toReturnState(result);
    });

    it('should handle setCurrentSubreddit action on an existing state', () => {
        const subreddit = '/r/Singapore';
        const result = {...initialState, currentSubreddit: subreddit};
        const action = setCurrentSubreddit(subreddit);
        const state = {...initialState, currentSubreddit: '/r/Beaches'};

        Reducer(redditReducer).withState(state).expect(action).toReturnState(result);
    });

    it('should handle toggleShowingComments action on an existing state', () => {
        const index = 0;
        const result = {...initialState, posts: [{showingComments: true}]};
        const action = toggleShowingComments(index);
        const state = {...initialState, posts: [{showingComments: false}]};

        Reducer(redditReducer).withState(state).expect(action).toReturnState(result);
    });
});

describe('searchTerm selector', () => {

    it('should select searchTerm from reddit state', () => {
        const searchTerm = 'hamburgers';
        const state = {reddit: {...initialState, searchTerm: searchTerm}};

        Selector(selectSearchTerm).expect(state).toReturn(searchTerm);
    });
});

describe('currentSubreddit selector', () => {

    it('should select currentSubreddit from reddit state', () => {
        const currentSubreddit = '/r/Cheese';
        const state = {reddit: {...initialState, currentSubreddit: currentSubreddit}};

        Selector(selectCurrentSubreddit).expect(state).toReturn(currentSubreddit);
    });
});