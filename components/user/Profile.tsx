import { v4 as uuid } from 'uuid';
import { Line } from "rc-progress";
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";


const Profile = (prop:any) =>{

    const [progress,setProgress] = useState(0);
    const [photoURL, setPhotoURL] = useState('');

    const uploadFiles = (file:any) => {

        if(!file) return;
    
        const newFileName = uuid();
        const storageRef = ref(storage,`post-images/${newFileName}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
    
        uploadTask.on("state_changed", (snapshot) =>{
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
    
          setProgress(prog);
        },(err)=>console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>setPhotoURL(url));
          }
        );
    
    };

    const formHandler = (e:any) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      }


    return(
        <>
 <section className="profile flex-col items-center justify-center relative">
    <div className="sticky top-0">

    <div
    style={{
        width: "250px",
        height: "250px",
        borderRadius: "70%",
        overflow: "hidden",
    }}
    className="box"
    >
    <img
        style={{
        width: "100%",
        height: "100%",
        borderRadius: "70%",
        overflow: "hidden",
        }}
        className="profile"
        src={`https://github.com/${prop.username}.png`}
        alt="profile"
    />
    </div>


    <div className="font-bold text-xl px-5 py-5">{prop.username}</div>

    <div>
    <a href={`https://github.com/${prop.username}`}>
        <img
        src={`https://github-readme-stats.vercel.app/api?username=${prop.username}&theme=vue&show_icons=true&line_height=40&count_private=true&hide=contribs`}
        alt={`${prop.username}'s GitHub Stats`}
        />
    </a>
    </div>

    <div>
    <img
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${prop.username}&card_width=500`}
        alt={`${prop.username}'s GitHub Stats`}
    />
    </div>

    <form onSubmit={formHandler}>
    <input type="file" className="input"/>
    <button
    className="bg-[#b8e994] hover:bg-[#78e08f] text-white font-bold py-2 px-4 border-b-4
            border-[#78e08f] hover:border-[#b8e994] rounded"
    type="submit">Upload</button>
    </form>

    <hr />

    <h3>Upload {progress} %</h3>
    <Line percent={progress} strokeWidth={2} strokeColor="#b8e994" />

    {photoURL?.length > 0 && (
    <div>
    <img style={{width:"300px", height:"300px"}} src={photoURL} alt='업로드 이미지'/>
    </div>
    )}

    </div>
    </section>
        </>
    )
}

export default Profile