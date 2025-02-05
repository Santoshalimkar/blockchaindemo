"use client"

import { useState, useEffect } from "react"
import MLMTree from "@/components/Downlinetreecomponents/MLMTree"
import UserSearch from "@/components/Downlinetreecomponents/UserSearch"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers, fetchAllUserstree } from "@/lib/Redux/usersSlice"
import { setUser } from "@/lib/Redux/AuthSlice"
import { Spinner } from "@heroui/react"

export default function Home() {
  const dispatch = useDispatch()
  const { treedata, loadingtree, errortree, setselectedid } = useSelector((state) => state.users)
  
  const [treeData, setTreeData] = useState(null)  // Start as null to prevent issues
  const [allUsers, setAllUsers] = useState([])

  // Track setselectedid in local state to ensure API call is triggered correctly
  const [localSelectedId, setLocalSelectedId] = useState(setselectedid)

  // Fetch data from Redux
  useEffect(() => {
    // Update localSelectedId whenever setselectedid from Redux changes
    setLocalSelectedId(setselectedid)
  }, [setselectedid]);

  // Fetch tree data based on selected ID
  useEffect(() => {
    if (localSelectedId) {
      dispatch(fetchAllUserstree(localSelectedId)); // Call API when localSelectedId changes
    }
  }, [dispatch, localSelectedId]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Update `treeData` when `treedata` from Redux changes
  useEffect(() => {
    if (treedata) {
      setTreeData(treedata)
    }
  }, [treedata]);

  useEffect(() => {
    if (!treeData) return

    const flattenTree = (node) => {
      if (!node) return []  // Handle null case
      return [node, ...(node.downline || []).flatMap(flattenTree)]
    }

    setAllUsers(flattenTree(treeData))
  }, [treeData]);

  const handleUserSelect = (userId) => {
    console.log(userId)
    dispatch(setUser(userId))
    // Update local state on user selection to trigger API call if needed
    setLocalSelectedId(userId);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-end mb-8">
        <UserSearch onSelect={handleUserSelect} />
      </div>
      <div className="mt-8 overflow-x-auto">
        <div className="inline-block min-w-full">
          {loadingtree ? (
            <div className="w-full h-[60vh] flex justify-center items-center">
              <Spinner color="danger"></Spinner>
            </div>
          ) : errortree ? (
            <p className="text-red-500">{errortree}</p>
          ) : (
            <MLMTree data={treeData} />
          )}
        </div>
      </div>
    </div>
  )
}
