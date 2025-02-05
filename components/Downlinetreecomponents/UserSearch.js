import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAllUsers, setuserId } from "@/lib/Redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";



export default function UserSearch({onSelect}) {
  const [search, setSearch] = useState("")
  const {treeData, setselectedid,users} = useSelector((state) => state.users)
const dispatch=useDispatch()

  // const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
  const filteredUsers = users.filter(
    (user) => user.Name && user.Name.toLowerCase().includes(search.toLowerCase())
  );
  
 useEffect(() => {
    dispatch(fetchAllUsers());  
  }, [dispatch]);

  
  



  return (
    <div className="w-full max-w-xs">
      <Select  onValueChange={onSelect}>
        <SelectTrigger className="w-full rounded-full">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent className="rounded-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full p-2 border rounded-full mb-2"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredUsers.map((user) => (
            <SelectItem key={user?._id} value={user?._id} className="rounded-md">
              {user.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 