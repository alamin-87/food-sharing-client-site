import React from 'react';
import HomeSlider from './HomeSlider';
import FeaturedFoods from './FeaturedFoods';
import ChooseUs from './ChooseUs';
import Works from './Works';

const Home = () => {
    return (
        <>
            <div>
                <HomeSlider></HomeSlider>
                <FeaturedFoods></FeaturedFoods>
                <ChooseUs></ChooseUs>
                <Works></Works>
            </div>
        </>
    );
};

export default Home;