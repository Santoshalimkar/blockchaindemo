import UserCard from "@/components/Downlinetreecomponents/UserCard"



export default function MLMTree({ data }) {
  return (
    <div className="flex flex-col items-center">
      <UserCard user={data} />
      {data?.downline?.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="border-l-2 border-gray-300 h-8"></div>
        </div>
      )}
      {data?.downline?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data?.downline.map((child, index) => (
            <div key={child.userId} className="flex flex-col items-center">
              <div className="border-t-2 border-gray-300 w-8 mb-4"></div>
              <MLMTree data={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

