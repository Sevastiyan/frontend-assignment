import { useState } from 'react'
import Image from 'next/image'
import AddComment from './AddComment'

export default function Comment({ comment, onAddReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [upvoteCount, setUpvoteCount] = useState(comment.upvoteCount)

  const handleUpvote = () => setUpvoteCount(upvoteCount + 1)
  const toggleReplyForm = () => setShowReplyForm(!showReplyForm)
  const toggleReplies = () => setShowReplies(!showReplies)
  const formatDate = date => new Date(date).toLocaleString()

  const UserImage = ({ imageUrl, nickName }) =>
    imageUrl.startsWith('http') ? (
      <Image src={imageUrl} alt='User Image' width={40} height={40} className='rounded-full border border-gray-300' />
    ) : (
      <div className='w-10 h-10 bg-gray-300 dark:bg-gray-500 rounded-full flex items-center justify-center'>
        <span className='text-lg font-bold text-gray-600 dark:text-gray-900'>{nickName[0]}</span>
      </div>
    )

  const CommentImages = ({ imageUrls }) => (
    <div className='flex space-x-2 mb-4 overflow-x-auto'>
      {imageUrls.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt='Comment Image'
          width={100}
          height={100}
          className='rounded-lg border border-gray-300'
        />
      ))}
    </div>
  )

  return (
    <div
      className={`mb-6 p-6 rounded-xl shadow-sm ${
        comment.isReply ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'
      }`}
    >
      <div className='flex items-center space-x-4 mb-4'>
        <UserImage imageUrl={comment.user.image_url} nickName={comment.user.nick_name} />
        <div>
          <p className='text-gray-900 dark:text-gray-100 font-bold'>{comment.user.nick_name}</p>
          <p className='text-gray-500 dark:text-gray-400 text-sm'>{formatDate(comment.createdAt)}</p>
        </div>
      </div>

      <p className='text-gray-800 dark:text-gray-100 mb-4'>{comment.content}</p>
      {comment.image_urls.length > 0 && <CommentImages imageUrls={comment.image_urls} />}

      <div className='flex items-center space-x-4 text-gray-600 dark:text-gray-200 mb-4'>
        <button onClick={handleUpvote} className='flex items-center space-x-1'>
          <Image src='/images/icon-upvote-14-px@3x.png' alt='Upvote' width={16} height={16} />
          <span className='text-gray-800 dark:text-gray-300'>{upvoteCount}</span>
        </button>

        {comment.replies ? (
          <button onClick={toggleReplyForm} className='text-pink-500 dark:text-pink-400 hover:underline'>
            {showReplyForm ? 'Cancel' : comment.replies ? 'Reply' : null}
          </button>
        ) : null}
      </div>

      <div className={`reply-box ${showReplyForm ? 'show' : ''}`}>
        <AddComment
          onAddComment={newReply => onAddReply(newReply, comment.id)}
          onSubmit={toggleReplyForm}
          parentId={comment.id}
          user={null} // Replace with actual user object
        />
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className='ml-8'>
          <div
            className={`border-l-2 border-pink-500 dark:border-pink-400 mt-4 pl-4 reply-container ${
              showReplies ? 'show' : ''
            }`}
          >
            {comment.replies.map(reply => (
              <Comment key={reply.id} comment={{ ...reply, isReply: true }} onAddReply={onAddReply} />
            ))}
          </div>
          <p onClick={toggleReplies} className='cursor-pointer text-pink-500 dark:text-pink-400'>
            {showReplies ? 'Collapse ' : `Show ${comment.replies.length} replies`}
          </p>
        </div>
      )}
    </div>
  )
}
