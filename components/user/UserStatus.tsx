const UserStatus = (props:any) =>{

    var status = props.status;
    
  switch (status){
    case 'online' :
      return(
        <div className='flex items-center justify-center cursor-pointer'>
            <span className='text-xs'>Online</span>
            <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700"></span>
        </div>
      )
      case 'idle' :
        return(
          <div className='flex items-center justify-center cursor-pointer'>
              <span className='text-xs'>Idle</span>
              <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-yellow-500"></span>
          </div>
        )
    case 'doNotDisturb' :
        return(
            <div className='flex items-center justify-center cursor-pointer'>
                <span className='text-xs'>Do Not Disturb</span>
                <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-red-600"></span>
            </div>
        )
    default : 
        return(
        <div className='flex items-center justify-center cursor-pointer'>
            <span className='text-xs'>Online</span>
            <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700"></span>
        </div>
      )
  }
}

export default UserStatus