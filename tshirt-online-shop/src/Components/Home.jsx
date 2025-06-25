import React,{useContext} from 'react'
import { TshirtContext } from '../Context/TshirtContext'
import ItemCard from './ItemCard';

const Home = () => {
  const {tshirts} = useContext(TshirtContext);
  return (
    <div>
      <div className='mt-12 flex text-5xl font-bold justify-center items-center'>Where Fashion meets Trend</div>
      <div>
        {tshirts.map((tshirt)=>(
          <div className='flex flex-row justify-center items-center'>
            <ItemCard key={tshirt.id} tshirt={tshirt} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

