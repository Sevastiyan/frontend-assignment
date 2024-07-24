import fs from 'fs'
import path from 'path'

import { useState } from 'react'
import Header from '../components/Header'
import ItemCard from '../components/ItemCard'

export default function Home({ items }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Header />
      <main className='container max-w-screen-lg mx-auto p-2'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6'>Products</h1>
        <input
          type='text'
          placeholder='Search items...'
          className='w-full p-2 mb-6 border rounded-lg text-gray-800 dark:text-gray-100 dark:bg-gray-800'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch items data from an API or database
  const items = await fetchItems()

  return {
    props: {
      items,
    },
  }
}

async function fetchItems() {
  // Replace this with the actual API call or database query
  const discussionFilePath = path.join(process.cwd(), 'data', 'discussion.json')
  const discussionData = JSON.parse(fs.readFileSync(discussionFilePath, 'utf8'))
  console.log(discussionData)

  // Populate the discussion data with dummy data
  return [...discussionData, ...discussionData, ...discussionData]
}
