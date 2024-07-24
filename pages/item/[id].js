import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'

import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import DiscussionPost from '../../components/ItemContent'
import Comment from '../../components/Comment'
import AddComment from '../../components/AddComment'
import SortComments from '../../components/SortComments'

export default function ItemPost({ discussionData, commentsData, initialSortBy }) {
  const router = useRouter()
  const { id } = router.query

  // const [discussion] = useState(discussionData)
  const [comments, setComments] = useState(commentsData)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [commentCount, setCommentCount] = useState(commentsData.length)

  const handleAddComment = (newComment, parentId = null) => {
    if (parentId) {
      // Add reply to a comment
      setComments(prevComments =>
        prevComments.map(comment => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...(comment.replies || []), newComment] }
          }
          return comment
        }),
      )
    } else {
      // Add new top-level comment
      setComments(prevComments => [...prevComments, newComment])
    }
  }

  const sortedComments = useMemo(() => {
    const sortComments = commentsToSort => {
      return [...commentsToSort].sort((a, b) => {
        switch (sortBy) {
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt)
          case 'mostUpvoted':
            return b.upvoteCount - a.upvoteCount
          case 'newest':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
      })
    }

    const sortedTopLevelComments = sortComments(comments)

    return sortedTopLevelComments.map(comment => ({
      ...comment,
      replies: comment.replies ? sortComments(comment.replies) : [],
    }))
  }, [comments, sortBy])

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Header />
      <main className='container max-w-screen-lg mx-auto p-4'>
        <DiscussionPost discussion={discussionData[0]} commentCount={commentCount} />
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
          <div className='flex items-center space-x-4 mb-4'>
            <h2 className='text-xl font-bold mb-4 text-gray-700 dark:text-gray-100'>Discussion</h2>
            <SortComments sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <AddComment onAddComment={handleAddComment} onSubmit={() => setCommentCount(commentCount + 1)} />
          {sortedComments.map(comment => (
            <Comment key={comment.id} comment={comment} onAddReply={handleAddComment} />
          ))}
        </div>
      </main>
    </div>
  )
}

/* -------------------------- Server Side Rendering ------------------------- */
export async function getServerSideProps(context) {
  const { id } = context.params
  const { query } = context
  const sortBy = query.sortBy || 'newest'

  const discussionData = await fetchDiscussionData(id)
  let commentsData = await fetchCommentsData(id)

  commentsData = sortComments(commentsData, sortBy)

  return {
    props: {
      discussionData,
      commentsData,
      initialSortBy: sortBy,
    },
  }
}

async function fetchDiscussionData(id) {
  // Replace this with the actual API call or database query
  // Use the id supplied from the URL to fetch the discussion data
  const discussionFilePath = path.join(process.cwd(), 'data', 'discussion.json')
  const discussionData = JSON.parse(fs.readFileSync(discussionFilePath, 'utf8'))
  return discussionData
}

async function fetchCommentsData(id) {
  // Replace this with the actual API call or database query
  // Use the id supplied from the URL to fetch the comments data
  const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json')
  const commentsData = JSON.parse(fs.readFileSync(commentsFilePath, 'utf8'))
  return commentsData
}

function sortComments(comments, sortBy) {
  return comments.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'mostUpvoted':
        return b.upvoteCount - a.upvoteCount
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })
}
