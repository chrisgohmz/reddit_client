import React from 'react';
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import {Subreddit} from './Subreddit';

const Subreddits = () => {
    const subreddits = useSelector();

    return (
        <Card>
            <ul>
                {subreddits.map(sub => <Subreddit></Subreddit>)}
            </ul>
        </Card>
    );    
};

export default Subreddits;