import {useGetCommentsQuery, useGetPostsQuery, useGetSubredditsQuery} from './redditAPI';
jest.mock('./redditAPI');

describe('redditAPI', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch the list of subreddits when useGetSubRedditsQuery is called successfully', () => {
        const mockResponse = {
            data: [{
                id: 'ashsh14516',
                display_name: 'Dinner',
                url: 'https://wwww.reddit.com/r/Dinner',
                primary_color: 'blue'
        }, {
                id: 'pn9pa0sg',
                display_name: 'Wind',
                url: 'https://www.reddit.com/r/Wind',
                primary_color: 'red'
        }],
            error: undefined,
            isLoading: false};
        useGetSubredditsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetSubredditsQuery();
        expect(data).toEqual(mockResponse.data);
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(false);
    });

    it('should return error is true if there is an error when calling useGetSubredditsQuery', () => {
        const mockResponse = {
            data: undefined,
            error: {
                status: 404,
                data: 'Error message'
            },
            isLoading: false
        };
        useGetSubredditsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetSubredditsQuery();
        expect(data).toBeUndefined();
        expect(error).toBeTruthy();
        expect(isLoading).toEqual(false);
    });

    it('should return isLoading is true if useGetSubredditsQuery is still loading', () => {
        const mockResponse = {
            data: undefined,
            error: undefined,
            isLoading: true
        };
        useGetSubredditsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetSubredditsQuery();
        expect(data).toBeUndefined();
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(true);
    });

    it('should fetch the list of posts from a subreddit when useGetPostsQuery is called successfully', () => {
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

        const {data, error, isLoading} = useGetPostsQuery('subreddit');
        expect(data).toEqual(mockResponse.data);
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(false);
    });

    it('should return error is true if there is an error when calling useGetPostsQuery', () => {
        const mockResponse = {
            data: undefined,
            error: {
                status: 404,
                data: 'Error message'
            },
            isLoading: false
        };
        useGetPostsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetPostsQuery('subreddit');
        expect(data).toBeUndefined();
        expect(error).toBeTruthy();
        expect(isLoading).toEqual(false);
    });

    it('should return isLoading is true if useGetPostsQuery is still loading', () => {
        const mockResponse = {
            data: undefined,
            error: undefined,
            isLoading: true
        };
        useGetPostsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetPostsQuery('subreddit');
        expect(data).toBeUndefined();
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(true);
    });

    it('should fetch the list of comments from a post when useGetCommentsQuery is called', () => {
        const mockResponse = {
            data: [{
            author: 'author1',
            created_utc: 152626,
            body: 'body1'
        }, {
            author: 'author2',
            created_utc: 2142156,
            body: 'body2'
        }], 
            error: undefined,
            isLoading: false
        };
        useGetCommentsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetCommentsQuery('permalink');
        expect(data).toEqual(mockResponse.data);
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(false);
    });

    it('should return error is true if there is an error when calling useGetCommentsQuery', () => {
        const mockResponse = {
            data: undefined,
            error: {
                status: 404,
                data: 'Error message'
            },
            isLoading: false
        };
        useGetCommentsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetCommentsQuery('permalink');
        expect(data).toBeUndefined();
        expect(error).toBeTruthy();
        expect(isLoading).toEqual(false);
    });

    it('should return isLoading is true if useGetCommentsQuery is still loading', () => {
        const mockResponse = {
            data: undefined,
            error: undefined,
            isLoading: true
        };
        useGetCommentsQuery.mockReturnValueOnce(mockResponse);

        const {data, error, isLoading} = useGetCommentsQuery('permalink');
        expect(data).toBeUndefined();
        expect(error).toBeUndefined();
        expect(isLoading).toEqual(true);
    });
});