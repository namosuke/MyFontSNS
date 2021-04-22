import React, { useEffect, useState } from 'react';
import axios from "axios";
import loadIcon from "../img/loading.svg";
import PostCard from "./PostCard";


const Timeline = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get('./timeline.json').then((res) => {
            setData(res.data);
        }).catch((err) => {
            //err
        })
    },[]);
    if (!data) return <img src={loadIcon} className={'load-icon'}  alt="読込中" />;
    return (<>
        {data.posts.map(item => (
            <PostCard userName={item.user.name} postText={item.text}/>
        ))}
    </>);
}

export default Timeline;