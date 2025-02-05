"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



export default function UserCard({ user }) {
  return (
   <Card className="w-64 max-w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
        <CardTitle className="text-lg font-semibold truncate">{user?.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="font-medium">Level:</p>
          <p className="text-right">{user?.level}</p>
          <p className="font-medium">Amount:</p>
          <p className="text-right">{user?.amount}</p>
          <p className="font-medium">Rank:</p>
          <p className="text-right">{user?.Rank}</p>
        </div>
      </CardContent>
    </Card>
  )
}

