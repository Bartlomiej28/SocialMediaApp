import React from 'react'

function SkeletonPost() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse">
        <div className="flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-64 bg-gray-300 rounded mt-4"></div>
            </div>
        </div>
    </div>
  )
}

export default SkeletonPost