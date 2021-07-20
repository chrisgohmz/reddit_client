import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setPosts, selectCurrentSubreddit, selectSearchTerm} from '../../store/redditSlice';
import {useGetPostsQuery} from '../../api/redditAPI';
import Post from '../Post/Post';
import './Home.css';
import {AnimatedList} from 'react-animated-list';
import getRandomNumber from '../../utils/getRandomNumber';
import PostLoading from '../Post/PostLoading';
 
const Home = () => {
    const reddit = useSelector(selectCurrentSubreddit);
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const {data, error, isLoading} = useGetPostsQuery(reddit);

    if (isLoading) {
        return (
            <AnimatedList animation="zoom">
              {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
            </AnimatedList>
        );
    };

    if (error) {
        return (
            <div className="error">
                <h2>Failed to load posts</h2>
            </div>
        )
    };

    let filteredPosts = searchTerm !== '' ? data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : data;

    dispatch(setPosts(filteredPosts));

    if (filteredPosts.length === 0) {
        return (
            <div className="error">
                <h2>No posts matching "{searchTerm}"</h2>
            </div>
        );
    }


    return (
        <div>
            {filteredPosts.map((post, index) => (
                <Post key={post.id} post={post} index={index}></Post>
            ))}
        </div>
    );
};

export default Home;