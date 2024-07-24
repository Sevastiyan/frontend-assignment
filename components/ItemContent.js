import { useState } from 'react'
import Image from 'next/image'

export default function DiscussionPost({ discussion, commentCount }) {
  const [upvoteCount, setUpvoteCount] = useState(discussion.upvoteCount)

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1)
  }

  return (
    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4'>
      <h1 className='text-2xl font-bold mb-2 text-gray-700 dark:text-gray-100'>{discussion.title}</h1>
      <p className='text-gray-700 mb-4 dark:text-gray-300 dark:text-balance'>{discussion.content}</p>
      <div className='flex space-x-4 mb-4 overflow-x-auto'>
        {discussion.image_urls.map((url, index) => (
          <Image key={index} src={url} alt='Discussion Image' width={200} height={200} className='rounded-lg' />
        ))}
        {/* Add more images here to test the responsiveness of the discussion post */}
        {discussion.image_urls.map((url, index) => (
          <Image key={index} src={url} alt='Discussion Image' width={200} height={200} className='rounded-lg' />
        ))}
        {discussion.image_urls.map((url, index) => (
          <Image key={index} src={url} alt='Discussion Image' width={200} height={200} className='rounded-lg' />
        ))}
      </div>
      <div className='flex items-center space-x-4 mb-4'>
        {discussion.user.image_url.startsWith('http') ? (
          <Image src={discussion.user.image_url} alt='User Image' width={50} height={50} className='rounded-full' />
        ) : (
          <div className='w-12 h-12 bg-gray-300 dark:text-gray-100 rounded-full flex items-center justify-center'>
            <span className='text-xl font-bold text-gray-600'>{discussion.user.nick_name[0]}</span>
          </div>
        )}
        <div>
          <p className='text-gray-800 dark:text-gray-100 font-semibold'>{discussion.user.nick_name}</p>
        </div>
      </div>
      <div className='flex items-center space-x-6 text-gray-600 '>
        <div className='flex items-center space-x-1'>
          <button onClick={handleUpvote} className='flex items-center space-x-1'>
            <Image src='/images/icon-upvote-14-px@3x.png' alt='Upvote' width={20} height={20} />
            <span className='text-gray-500 dark:text-gray-400'>{upvoteCount}</span>
          </button>
        </div>
        <div className='flex items-center space-x-1'>
          <Image src='/images/icon-comment-14-px@3x.png' alt='Comment' width={20} height={20} />
          <span className='text-gray-500 dark:text-gray-400'>{commentCount}</span>
        </div>
        <span className='text-gray-500 dark:text-gray-400'>Views: {discussion.viewCount}</span>
      </div>
    </div>
  )
}
