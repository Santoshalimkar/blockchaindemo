import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export default function UserSearch({ users, onSelect }) {
  const [search, setSearch] = useState("")

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={onSelect}>
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
            <SelectItem key={user.userId} value={user.userId} className="rounded-md">
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

