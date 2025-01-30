import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";

export default function CreateContentModel({open, onClose}) {
  return (
    <div>
      { open && (<div className="h-screen w-screen bg-slate-400 fixed top-0 left-0 bg-opacity-60 flex items-center justify-center">
        <div className="bg-white w-[350px] h-auto pb-4 relative top-0 left-0 rounded-md">
        <div className=" flex justify-end pt-2 mr-2 cursor-pointer" onClick={onClose}>
              <CrossIcon />
            </div>
            <div className="ml-3 flex flex-col items-center ">
            <InputBox placeholder={"Title"}/>
            <InputBox placeholder={"Link"}/>
            <div className="mt-2">
                <Button variant="primary" text={"summit"} onClick={()=>{}} ></Button>
            </div>
            </div>
        </div>
      </div>) }
    </div>
  )
}


function InputBox({placeholder}){
    return(
        <input className="pl-4 p-2 border rounded-lg mt-3 w-[300px]"  type="text" placeholder={placeholder}  />
    )
}