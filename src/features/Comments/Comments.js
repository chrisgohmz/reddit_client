import React from 'react';
import moment from 'moment';
import './Comments.css';
import Avatar from '../Avatar/Avatar';
import {useGetCommentsQuery} from '../../api/redditAPI';
import Skeleton from 'react-loading-skeleton';

const Comments = ({permalink}) => {
  const {data, error, isLoading} = useGetCommentsQuery(permalink);

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

  return (data.map(comment => (
  <div className="comment">
    <div className="comment-metadata">
      <Avatar name={comment.author} />
      <p className="comment-author">{comment.author}</p>
      <p className="comment-created-time">
        {moment.unix(comment.created_utc).fromNow()}
      </p>
    </div>
    {comment.body}
  </div>)
  ));
};

export default Comments;