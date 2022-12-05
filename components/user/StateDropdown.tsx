import useStore from "../../store"
import UserStatus from "./UserStatus";
import { useState } from "react";

const StateDropdown = (props:any) =>{

    const [dropdown, setDropdown] = useState(false);
    const [myStatus, setMyStatus] = useState('online');

    const postCount = useStore((state:any) => state.postCount)

    return(
    <section>
        <div>
        <div onClick={() => setDropdown(!dropdown)} className="p-3 bg-white dark:bg-darkSecondary shadow-lg rounded-xl flex items-center justify-center w-44 cursor-pointer">
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
    </section>
    )
}

export default StateDropdown