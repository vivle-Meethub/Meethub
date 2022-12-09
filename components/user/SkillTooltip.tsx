import React from 'react';

export const SkillTooltip = (props:any) => {

  return (
    <div className="relative flex flex-col items-center group">
      <div  className="text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full">{props.skill}</div>
      <div className="absolute left-4 hidden flex flex-col items-center mb-6 group-hover:flex w-56">
        <span className="relative z-10 p-3 text-xs leading-none text-gray-600 dark:text-white bg-white dark:bg-black shadow-lg rounded-lg space-y-1">
          {/* <h1 className='text-base font-medium'>This is skill title</h1> */}
          <p className='text-xs md:text-sm break-all'>
              {props.description}
          </p>
        </span>
        {/* <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-200 dark:bg-black shadow-lg"></div> */}
      </div>
    </div>
  );
};