"use client"

import { useState, useEffect } from "react"
import MLMTree from "@/components/Downlinetreecomponents/MLMTree"
import UserSearch from "@/components/Downlinetreecomponents/UserSearch"

// This would typically come from an API call
const initialData = {
  status: true,
  code: 200,
  data: {
    userId: "67a2f80e3a4cb5de73aadf4d",
    name: "user1",
    level: 0,
    amount: 30,
    Rank: 5,
    downline: [
      {
        userId: "67a2f81f3a4cb5de73aadf50",
        name: "user2",
        level: 1,
        amount: 20,
        Rank: 4,
        downline: [
          {
            userId: "67a2f82c3a4cb5de73aadf55",
            name: "user3",
            level: 2,
            amount: 10,
            Rank: 3,
            downline: [
              {
                userId: "67a2f8383a4cb5de73aadf5a",
                name: "user4",
                level: 3,
                amount: 20,
                Rank: 2,
                downline: [
                  {
                    userId: "67a306a42a14dae7542734d9",
                    name: "user5",
                    level: 4,
                    amount: 0,
                    Rank: 1,
                    downline: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        userId: "67a306e62a14dae7542734e9",
        name: "user6",
        level: 1,
        amount: 0,
        Rank: 3,
        downline: [],
      },
    ],
  },
}

export default function Home() {
  const [treeData, setTreeData] = useState(initialData.data)
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    // Flatten the tree structure to get all users for the dropdown
    const flattenTree = (node) => {
      return [node, ...node.downline.flatMap(flattenTree)]
    }
    setAllUsers(flattenTree(initialData.data))
  }, [])

  const handleUserSelect = (userId) => {
    const findUser = (node) => {
      if (node.userId === userId) return node
      for (const child of node.downline) {
        const found = findUser(child)
        if (found) return found
      }
      return null
    }
    const selectedUser = findUser(initialData.data)
    if (selectedUser) setTreeData(selectedUser)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-end mb-8">
        <UserSearch users={allUsers} onSelect={handleUserSelect} />
      </div>
      <div className="mt-8 overflow-x-auto">
        <div className="inline-block min-w-full">
          <MLMTree data={treeData} />
        </div>
      </div>
    </div>
  )
}

