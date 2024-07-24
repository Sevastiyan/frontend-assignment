// components/SortComments.js
export default function SortComments({ sortBy, onSortChange }) {
  return (
    <div className='mb-4 flex items-center'>
      {/* <label htmlFor='sort-select' className='mr-2 font-semibold text-gray-700 dark:text-gray-100'>
        Sort by:
      </label> */}
      <div className='relative'>
        <select
          id='sort-select'
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          className='appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-100 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
          <option value='mostUpvoted'>Most Upvoted</option>
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M7 10l5 5 5-5H7z' />
          </svg>
        </div>
      </div>
    </div>
  )
}
