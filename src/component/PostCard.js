import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const PostCard = (props) =>{
const { userName , postText } = props;
console.log(props)
return(
    <div className={"timeline-box"} >
        <div className={`post-card`}>
            <p className={`name-tag`}>
                {userName }
            </p>
            <p className={`post-card-text` }>
                {postText}
            </p>
            <div className={`post-bottom`}>

            </div>
        </div>
    </div>
);
}
export default PostCard;