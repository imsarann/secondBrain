import { useState } from "react"
import Button from "./components/Button"
import Card from "./components/Card"
import CreateContentModel from "./components/CreateContentModel"
import PlusIcon from "./icons/PlusIcon"
import ShareIcon from "./icons/ShareIcon"
import Sidebar from "./components/Sidebar"
function App() {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div>
      <Sidebar/>
    <div className="p-4 ml-72 bg-slate-200 min-h-screen">
      <div className="flex justify-end gap-4">
      <CreateContentModel open={modelOpen} onClose={()=>{
        setModelOpen(false);
      }}/>
      <Button variant="primary" text="Add content" startIcon={<PlusIcon/>} onClick={()=>{
        setModelOpen(true)
      }}/>
      
      <Button variant="secondary" text="Add content" startIcon={<ShareIcon/>} />
      <div className="flex flex-row gap-4">
      </div>
      </div>
      <div className="flex gap-4">

      <Card title={"hello world -1 "} link={"https://x.com/elonmusk/status/1884670471201055192"} type="twitter"/>
      <Card title={"hello world -2 "} link={"https://www.youtube.com/watch?v=sSRaakd95Nk"} type="youtube"/>

      </div>
    </div>
      </div>
  )
}

export default App
