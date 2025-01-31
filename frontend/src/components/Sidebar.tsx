import SideBarItem from './SideBarItem'
import TwitterIcon from '../icons/TwitterIcon'
import YoutubeIcon from '../icons/YoutubeIcon'
import Logo from '../icons/Logo'

export default function Sidebar() {
  return (
    <div className='bg-white text-black t-0 l-0 w-72 h-screen border-r fixed'>
      <div className='flex pt-8 pl-4'>
        <div className='pr-2 text-purple-500'>
           {<Logo/>}
          </div>
          <div className='text-[24px]'> Brainly </div>
      </div>
      <div className='text-gray-700 pt-4 pl-2'>
      <SideBarItem text={"Twitter"} icon={<TwitterIcon/>}/>
      <SideBarItem text={"Youtube"} icon={<YoutubeIcon/>}/>

      </div>
    </div>
  )
}
