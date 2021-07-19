import React from 'react';
import './Avatar.css';

const Avatar = ({name}) => {
    return (
        <img
        src={`https://api.adorable.io/avatars/10/${name}`}
        alt={`${name} profile`}
        className="avatar-profile-image"
        ></img>
    );
};

export default Avatar;