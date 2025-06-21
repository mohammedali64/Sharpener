import React from 'react';
import Items from './Items';

const Home = () => {
  return (
    <>
    <div
      className="flex flex-col gap-4 w-3xl text-white rounded-2xl shadow-2xl"
      style={{ backgroundColor: '#2e2e2e',paddingTop:'2%' ,paddingBottom:'2%'}}
    >
      <div className="text-center">
        <h1 className="font-bold text-4xl pt-5">
          Delicious Food, Delivered to You
        </h1>
      </div>
      <div className="flex text-center flex-col gap-4 text-lg">
        <p>
          Choose your favorite meal from our broad selection of favourite meals
          and enjoy a delicious lunch or dinner at home
        </p>
        <p>
          All meals are cooked with high quality ingredients, just in time and
          of course by experienced chefs
        </p>
      </div>
    </div>
    <div className='w-4xl bg-blue-200 rounded-2xl shadow-2xl' style={{paddingTop:'20px', paddingBottom:'30px'}}>
        <Items/>
      </div>
    </>
  );
};

export default Home;
