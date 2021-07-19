import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectCurrentSubreddit, selectSearchTerm, setPosts} from '../../store/redditSlice';
import {useGetPostsQuery} from '../../api/redditAPI';
import Post from '../Post/Post';
 
const Home = () => {
    const reddit = useSelector(selectCurrentSubreddit);
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const {data, error, isLoading} = useGetPostsQuery(reddit);

    if (isLoading) {
        return <h2>Posts Loading</h2>
    };

    if (error) {
        return (
            <div className="error">
                <h2>Failed to load posts</h2>
            </div>
        )
    };

    const filteredPosts = searchTerm !== '' ? data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : data;

    if (filteredPosts.length === 0) {
        return (
            <div className="error">
                <h2>No posts matching "{searchTerm}"</h2>
            </div>
        );
    }

    dispatch(setPosts(filteredPosts.map(post => ({
        ...post,
        showingComments: false,
        comments: []
    }))));

    return (
        <div>
            {filteredPosts.map((post, index) => (
                <Post key={post.id} post={post} index={index}></Post>
            ))}
        </div>
    );
};

export default Home;