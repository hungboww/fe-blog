import React, {useContext, useEffect, useState} from "react";
import axiosInstance from "../../axios";
import './User.scss'
import {UserContext} from "../Context/Context";
import InformationUser from "./UserFollow"
import TabInfomation from "./TabsUser"
const UserInfo = () => {

    const [infor, setInfor] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const data1 = useContext(UserContext).setData(infor.user, infor.image, infor.email);
    useEffect(() => {
        axiosInstance.get('user-blog/info/').then((res) => {
            const allPosts = res.data.data;
            setInfor(allPosts);
        });
    }, []);

    useEffect(() => {
        axiosInstance.get('blog/count/').
        then((res) => {
            const allPosts = res.data.data;
            setBlogs(allPosts);
                        console.log(1111111111111111111111,res)

        }
            )
        .catch((err) => {
                console.log(1111111111111111111111111111111,err)
            });
    }, []);

    // toUpperCase text
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }
    return (<>
            <div>
                <div className='user-profile'>
                    <InformationUser></InformationUser>
                    <div className='user-profile_card'>
                    </div>
                </div>
                <div className='profile-tabs'>
                    <ul className='profile-tabs_item'>
                        <TabInfomation></TabInfomation>
                    </ul>
                </div>
            </div>
        </>
    )

};
export default UserInfo;