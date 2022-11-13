import useStore from "../../store";

const ViewToggle = (props:any) =>{


    const is3D = useStore((state:any) => state.is3D)
    const changeView = useStore((state:any) => state.changeView)

    return(
        <>
            <div className="view-toggle flex items-center mr-20">
                  <div
                    onClick={changeView}
                    className=" relative inline-block w-10 mr-2 align-middle select-none"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      id="Green"
                      className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="Green"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <span className="text-gray-400 font-medium">
                    {is3D ? "3D" : "2D"}
                  </span>
                </div>
        </>
    )
}

export default ViewToggle