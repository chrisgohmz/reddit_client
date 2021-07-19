import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TiArrowUpOutline, TiArrowDownOutline, TiArrowUpThick, TiArrowDownThick, TiMessage} from 'react-icons/ti';
import Skeleton from 'react-loading-skeleton';
import Comment from '../Comment/Comment';
import Card from '../../components/Card/Card';
import moment from 'moment';
import {useGetCommentsQuery} from '../../api/redditAPI';
import Avatar from '../Avatar/Avatar';
import {setComments, toggleShowingComments} from '../../store/redditSlice';
import shortenNumber from '../../utils/shortenNumber';
import './Post.css';

const Post = ({key, post, index}) => {

    const [voteValue, setVoteValue] = useState(0);
    const dispatch = useDispatch();

    const {data, error, isLoading} = useGetCommentsQuery(post.permalink);

    const onToggleComments = index => {
      dispatch(setComments({index: index, comments: data}));
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
          return <TiArrowUpThick></TiArrowUpThick>;
      }
      return <TiArrowUpOutline></TiArrowUpOutline>;
    };

    const renderDownvote = () => {
      if (voteValue === -1) {
          return <TiArrowDownThick></TiArrowDownThick>;
      }
      return <TiArrowDownOutline></TiArrowDownOutline>;
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
      if (error) {
        return (
          <div>
            <h3>Error loading comments</h3>
          </div>
        );
      }
  
      if (isLoading) {
        return (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        );
      }
  
      if (post.showingComments) {
        return (
          <div>
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
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
                      post.showingComments && 'showing-comments'
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