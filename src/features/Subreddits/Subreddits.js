import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import {setSubreddits, selectSubreddits} from '../../store/subredditsSlice';
import {selectCurrentSubreddit, setCurrentSubreddit} from '../../store/redditSlice';
import {useGetSubredditsQuery} from '../../api/redditAPI';

const Subreddits = () => {
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    const {data, error, isLoading} = useGetSubredditsQuery();

    if (error) {
        return <h2>Error, unable to fetch subreddits</h2>;
    };

    if (isLoading) {
        return <h2>Loading subreddits...</h2>;
    };

    dispatch(setSubreddits(data));

    return (
        <Card className="subreddit-card">
            <h2>Subreddits</h2>
            <ul className="subreddits-list">
                {subreddits.map(subreddit => (
                    <li
                    key={subreddit.id}
                    className={`${currentSubreddit === subreddit.url && `selected-subreddit`}`}>
                        <button
                        type="button"
                        onClick={() => dispatch(setCurrentSubreddit(subreddit.url))}>
                            <img
                            src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`}
                            alt={`${subreddit.display_name}`}
                            className="subreddit-icon"
                            style={{ border: `3px solid ${subreddit.primary_color}` }}
                            ></img>
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default Subreddits;