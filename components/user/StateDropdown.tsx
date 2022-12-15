import UserStatus from "./UserStatus";
import { useState } from "react";

const StateDropdown = (props:any) =>{

    const [dropdown, setDropdown] = useState(false);
    const [myStatus, setMyStatus] = useState('online');

    return(
        <div>
        <div onClick={() => setDropdown(!dropdown)} className="p-2 bg-white dark:bg-darkSecondary shadow-lg rounded-full flex items-center justify-center  cursor-pointer">
            <UserStatus status = {myStatus}/>
        </div>
        <ul
            className={
            dropdown
                ? 'flex my-1 items-center space-x-2 p-2 rounded-xl bg-white dark:bg-darkSecondary shadow-2xl w-fit'
                : 'invisible inline-flex my-1 items-center space-x-2 p-2 rounded-xl bg-white dark:bg-darkSecondary shadow-2xl w-fit'
            }>
            <li onClick={()=>{
                setMyStatus('online')
                setDropdown(false)
            }}>
                <UserStatus status='online'/>
            </li>

            <li onClick={()=>{
                setMyStatus('idle')
                setDropdown(false)
            }}>
                <UserStatus status='idle'/>
            </li>

            <li onClick={()=>{
                setMyStatus('doNotDisturb')
                setDropdown(false)
            }}>
                <UserStatus status='doNotDisturb'/>
            </li>
        </ul>
        </div>
    )
}

export default StateDropdown