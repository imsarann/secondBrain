import { ReactElement } from 'react';

export default function SideBarItem({text, icon}: {
    text : string;
    icon : ReactElement;
}) {
  return (
    <div className='flex mt-2 items-center pl-6  cursor-pointer hover:bg-gray-300 rounded w-[250px] tansition-all duration-300'>
      {/* <div className='flex justify-center'> */}
      <div className="pr-[5px] ">
      {icon}
      </div>
      <div className="p-2 text-xl">
      {text}
      </div>
    </div>
  )
}
