import useStore from "../../store"

const MobileProfile = (props:any) =>{

    const postCount = useStore((state:any) => state.postCount)

    return(
        <section className="mobile-profile hidden justify-center mt-16 max-sm:flex px-4">
        <div className="bg-white shadow-lg rounded-2xl w-full  dark:bg-gray-800">
<img alt="profil" src="/Img/profile-bg.png" className="w-full mb-4 rounded-t-lg h-28"/>
<div className="flex flex-col items-center justify-center p-4 -mt-16">
  <a href="#" className="relative block">
      <img 
        alt="mobile-profile"  
        src={`https://github.com/${props.username}.png`}
        className="mx-auto object-cover rounded-full h-16 w-16 dark:border-gray-800"
        onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="/Img/user.png";
          }}
        />
  </a>
  <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
      {props.username} 
  </p>
  <p className="mb-4 text-xs text-gray-400">
    FullStack dev
  </p>

  <div className="p-2 px-4 text-xs  ark:bg-darkSecondary shadow-lg rounded-full">
    <div className='flex items-center justify-center cursor-pointer'>
            <span className='text-xs ml-2'>Online</span>
            <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700"></span>
        </div>
  </div>


  <div className="w-full p-2 mt-4 rounded-lg">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
          <p className="flex flex-col">
          posts
              <span className="text-center first-line:font-bold text-black dark:text-white">
                  {postCount}
              </span>
          </p>
          <p className="flex flex-col">
          followers
              <span className="text-center font-bold text-black dark:text-white">
                  0
              </span>
          </p>
          <p className="flex flex-col">
          following
              <span className="text-center font-bold text-black dark:text-white">
                  0
              </span>
          </p>
      </div>
  </div>
</div>
</div>
</section>
    )
}

export default MobileProfile
