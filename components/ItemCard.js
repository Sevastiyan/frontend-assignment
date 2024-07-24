import Image from 'next/image'
import Link from 'next/link'

export default function ItemCard({ item }) {
  return (
    <Link href={`/item/${item.id}`}>
      <div className='h-full max-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300'>
        <Image src={item.image_urls[0]} alt={item.name} width={200} height={200} className='rounded-lg mb-4' />
        <h2 className='text-md font-semibold text-gray-800 dark:text-gray-100 mb-2'>{item.title}</h2>
        <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>{item.brand}</p>

        <div className='flex justify-between items-center mb-4'>
          <Image src='/images/icon-upvote-14-px@3x.png' alt='Upvote' width={20} height={20} />
          <span className='text-gray-500 dark:text-gray-400'>{item.upvoteCount}</span>
          <Image src='/images/icon-comment-14-px@3x.png' alt='Comments' width={20} height={20} />
          <span className='text-gray-500 dark:text-gray-400'>{item.commentCount}</span>
          <span className='text-gray-500 dark:text-gray-400'>Views: {item.viewCount}</span>
        </div>
      </div>
    </Link>
  )
}
