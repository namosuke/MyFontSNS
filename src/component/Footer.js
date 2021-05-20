import {Link} from "react-router-dom";
import homeIcon from "../img/icons8-home.svg";
import bellIcon from "../img/bell2.svg";
import messageIcon from "../img/mail.svg";
import profileIcon from "../img/user.svg";
import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/"><img src={homeIcon} width="30" alt="タイムライン" /></Link>
            <Link to="/notifications"><img src={bellIcon} width="30" alt="通知" /></Link>
            <Link to="/messages"><img src={messageIcon} width="30" alt="メッセージ" /></Link>
            <Link to="/profile"><img src={profileIcon} width="30" alt="プロフィール" /></Link>
        </div>
    );
}
export default Footer;