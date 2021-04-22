import axios from "axios";
import loadIcon from "../img/loading.svg";
import React, { useEffect, useState } from 'react';
import PostCard from "./PostCard";

const Profile = () => {
    const [data, setData] =useState();
    useEffect(()=>{
        const getUserData= async () =>{
            const  response = await axios.get('./timeline.json');
            console.log(response.data.users[0].tags);
            setData(response.data);
        }
        getUserData();
    },[]);
    if (!data) return <img src={loadIcon} className={'load-icon'}  alt="読込中" />;
    return (<>
        <div className={`profile-container`}>
            <div className={`profile-main-container grid`}>
                <div className={`left-container`}>
                    <img src={loadIcon} className={'profile-icon'}  alt="読込中" />
                    <h2>{data.users[0].name}</h2>
                    <h3>@{data.users[0].screen_id}</h3>
                    <div className={`follow-container`}>
                        <p>フォロー{data.users[0].follow.length}</p>
                        <p>フォロワー{data.users[0].follower.length}</p>
                    </div>
                </div>
                <div className={`right-container`}>
                    {data.users[0].tags.map(item =>
                        <p className={`tags`}>
                            {item}
                        </p>
                    )}
                </div>
            </div>


            <div>
                <p className={`look-at-fonts`}>
                    フォントを見る
                </p>
            </div>
            <div className={`posts-container`}>
                {data.posts.map(item => item.user.id == data.users[0].id ?(
                    <PostCard userName={item.user.name} postText={item.text}/>
                ):(''))}
            </div>
        </div>
    </>);
}
export default Profile;