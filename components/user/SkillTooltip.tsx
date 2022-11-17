import React from 'react';

export const SkillTooltip = () => {

  return (
    <div className="relative flex flex-col items-center group">
      <div  className="text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full">Badge</div>
      <div className="absolute bottom-4 hidden flex flex-col items-center mb-6 group-hover:flex">
        <span className="relative z-10 p-3 text-xs leading-none text-gray-600 dark:text-white bg-white dark:bg-black shadow-lg rounded-lg space-y-1">
          <h1 className='text-base font-medium'>This is skill title</h1>
          <p className='text-xs md:text-sm'>This is a skill paragraph</p>
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-200 dark:bg-black shadow-lg"></div>
      </div>
    </div>
  );
};