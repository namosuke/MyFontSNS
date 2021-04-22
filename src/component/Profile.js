import axios from "axios";
import loadIcon from "../img/loading.svg";
import React, { useEffect, useState } from 'react';

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
                        <p className={`
            flex 
            items-center
            justify-center
            px-1
            py-1
            border
            border-transparent 
            text-base 
            font-medium 
            rounded-md 
            text-white 
            bg-indigo-600 
            hover:bg-indigo-700 
            md:py-4 
            md:text-lg 
            md:px-10
            tags
            `}>
                            {item}
                        </p>
                    )}
                </div>
            </div>


            <div>
                <p className={` w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10`}>
                    フォントを見る
                </p>
            </div>
            <div className={`posts-container`}>
                {data.posts.map(item => item.user.id==data.users[0].id ?(
                    <div className={"ml-3 inline-flex rounded-md box-container"} >
                        <div className={`
                         items-center
                         justify-center
                         px-5
                         py-3
                         border
                         border-transparent
                         text-base
                         font-medium
                         rounded-md
                         text-indigo-600
                         hover:bg-indigo-50i
                         post-card
                         `}>
                            <p className={`
                          text-lg
                          name-tag`}>
                                {item.user.name}
                            </p>
                            <p className={`
                         px-5 
                         py-3` }>
                                {item.text}
                            </p>
                        </div>

                    </div>
                ):(''))}
            </div>
        </div>
    </>);
}
export default Profile;