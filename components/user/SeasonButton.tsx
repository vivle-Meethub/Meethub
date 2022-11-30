const SeasonButton = (props:any) =>{

    return(
    <div
  className="my-5 mx-1 button w-12 h-16 bg-white rounded-lg cursor-pointer select-none
              active:translate-y-2  active:[box-shadow:0_0px_0_0_#78e08f,0_0px_0_0_#b8e994]
              active:border-b-[0px]
              transition-all duration-150 [box-shadow:0_10px_0_0_#78e08f,0_15px_0_0_#b8e994]
              border-b-[1px] border-[#b8e994]
            "
>
  <span className="flex flex-col justify-center items-center h-full text-black font-bold text-lg border-[1px] border-[#b8e994] rounded-[5px]">
        {props.emoji}
  </span>
</div>
    )
}

export default SeasonButton
