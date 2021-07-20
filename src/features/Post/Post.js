import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TiArrowUpOutline, TiArrowDownOutline, TiArrowUpThick, TiArrowDownThick, TiMessage} from 'react-icons/ti';
import Comments from '../Comments/Comments';
import Card from '../../components/Card/Card';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import {toggleShowingComments} from '../../store/redditSlice';
import shortenNumber from '../../utils/shortenNumber';
import './Post.css';

const Post = ({post, index}) => {

    const [voteValue, setVoteValue] = useState(0);
    const showingComments = useSelector(state => state.reddit.posts[index].showingComments);
    const dispatch = useDispatch();

    const onToggleComments = index => {
      dispatch(toggleShowingComments(index));
    };

    const handleVote = newValue => {
      if (newValue === voteValue) {
          setVoteValue(0);
      } else if (newValue === 1) {
          setVoteValue(1);
      } else {
          setVoteValue(-1);
      }
    };

    const renderUpvote = () => {
      if (voteValue === 1) {
          return <TiArrowUpThick className="icon-action"></TiArrowUpThick>;
      }
      return <TiArrowUpOutline className="icon-action"></TiArrowUpOutline>;
    };

    const renderDownvote = () => {
      if (voteValue === -1) {
          return <TiArrowDownThick className="icon-action"></TiArrowDownThick>;
      }
      return <TiArrowDownOutline className="icon-action"></TiArrowDownOutline>;
    };

    const getVoteType = () => {
      if (voteValue === 1) {
        return 'up-vote';
      } else if (voteValue === -1) {
        return 'down-vote';
      }

      return '';
    };

    const renderComments = () => {
      if (showingComments) {
        return (
          <div>
            <Comments permalink={post.permalink}></Comments>
          </div>
        );
      }
  
      return null;
    };

    return (
      <article key={post.id}>
        <Card>
          <div className="post-wrapper">
            <div className="post-votes-container">
              <button
                type="button"
                className={`icon-action-button up-vote ${
                  voteValue === 1 && 'active'
                }`}
                onClick={() => handleVote(1)}
                aria-label="Up vote"
              >
                {renderUpvote()}
              </button>
              <p className={`post-votes-value ${getVoteType()}`}>
                {shortenNumber(post.ups, 1)}
              </p>
              <button
                type="button"
                className={`icon-action-button down-vote ${
                  voteValue === -1 && 'active'
                }`}
                onClick={() => handleVote(-1)}
                aria-label="Down vote"
              >
                {renderDownvote()}
              </button>
            </div>
            <div className="post-container">
              <h3 className="post-title">{post.title}</h3>
  
              <div className="post-image-container">
                <img src={post.url} alt="" className="post-image" />
              </div>
  
              <div className="post-details">
                <span className="author-details">
                  <Avatar name={post.author} />
                  <span className="author-username">{post.author}</span>
                </span>
                <span>{moment.unix(post.created_utc).fromNow()}</span>
                <span className="post-comments-container">
                  <button
                    type="button"
                    className={`icon-action-button ${
                      showingComments && 'showing-comments'
                    }`}
                    onClick={() => onToggleComments(index)}
                    aria-label="Show comments"
                  >
                    <TiMessage className="icon-action" />
                  </button>
                  {shortenNumber(post.num_comments, 1)}
                </span>
              </div>
  
              {renderComments()}
            </div>
          </div>
        </Card>
      </article>
    );
};

export default Post;