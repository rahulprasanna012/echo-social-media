import { type FC } from 'react'

type FeedLabelProps = {
label: string
  
}

const FeedLabel:FC<FeedLabelProps> = ({label}) => {
  return (
    <li key={label} className='bg-purple-100 text-sm flex-wrap mx-4 text-purple-600 rounded-4xl px-2 p-1'>{label}</li>
  )
}

export default FeedLabel