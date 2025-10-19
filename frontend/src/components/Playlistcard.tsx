import { FaMusic } from "react-icons/fa6"
import { useUserData } from "../context/UserContext"

const Playlistcard = () => {
  const {user, isAuth} = useUserData();
  return (
    <div className="flex item-center p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-500">
    <div className="w-10 h-10 flex bg-gray-600 items-center justify-center rounded-md">
     <FaMusic className="text-white text-xl" /> 
     </div>
     <div className="ml-4">
         <h2>My PlayList</h2>
         <p className="text-gray-400 text-sm">
            PlayList • {" "}{isAuth ? <span>{user?.name}</span> : <span>{"user"}</span>}
         </p>
     </div>
    </div>
  )
}

export default Playlistcard