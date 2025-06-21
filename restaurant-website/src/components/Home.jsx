import React from 'react';

const Home = () => {
  return (
    <div
      className="flex flex-col gap-4 w-3xl text-white mt-20 rounded-2xl"
      style={{ backgroundColor: '#2e2e2e' }}
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
  );
};

export default Home;
