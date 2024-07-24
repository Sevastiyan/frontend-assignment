import { useState } from 'react'
import Image from 'next/image'

export default function AddComment({ onAddComment, parentId = null, onSubmit, user, isReply }) {
  const [content, setContent] = useState('')

  user ?? {
    id: 'current-user-id', // Actual user's ID
    nick_name: 'Current User', // Actual user's name
    image_url: '/images/default-avatar.svg', // Actual user's avatar
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (content.trim()) {
      const newComment = {
        id: Date.now(), // Temporary ID.
        content: content.trim(),
        user: {
          id: 'current-user-id', // Actual user's ID
          nick_name: 'Current User', // Actual user's name
          image_url: '/images/default-avatar.svg', // Actual user's avatar
        },
        createdAt: new Date().toISOString(),
        upvoteCount: 0,
        viewCount: 0,
        image_urls: [],
        replies: user ? [] : null,
      }

      onAddComment(newComment, parentId)
      setContent('')

      // Toggle the reply form
      if (onSubmit) {
        onSubmit()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-4 mb-6'>
      <div className='flex items-start space-x-4'>
        {user ? (
          <div className='w-10 h-10 bg-gray-300 dark:bg-gray-500 rounded-full flex items-center justify-center'>
            <span className='text-lg font-bold text-gray-600 dark:text-gray-900'>{nick_name[0]}</span>
          </div>
        ) : (
          <Image
            src='/images/default-avatar.svg' // Actual user avatar
            alt='User Avatar'
            width={40}
            height={40}
            className='rounded-full'
          />
        )}
        <div className='flex-grow text-gray-700 dark:text-gray-100'>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Add a comment...'
            className='w-full p-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent'
            rows='3'
          />
          <div className='mt-2 flex justify-start'>
            <button
              type='submit'
              className='px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 '
              disabled={!content.trim()}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
