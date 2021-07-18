import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const redditApi = createApi({
    reducerPath: 'redditApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://www.reddit.com'}),
    endpoints: (builder) => ({
        getSubreddits: builder.query({
            query: () => '/subreddits.json',
            transformResponse: response => response.data.children.map(post => post.data)
        }),
        getPosts: builder.query({
            query: (subreddit) => `${subreddit}.json`,
            transformResponse: response => response.data.children.map(subreddit => subreddit.data)
        }),
        getComments: builder.query({
            query: (permalink) => `${permalink}.json`,
            transformResponse: response => response[1].data.children.map(subreddit => subreddit.data)
        })
    })
});

export const {useGetSubredditsQuery, useGetPostsQuery, useGetCommentsQuery} = redditApi;