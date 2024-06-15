import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800 hover:text-green-500 transition duration-300 ease-in-out">
          Welcome to Our Gym
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Join us today and start your fitness journey!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-green-500 transition duration-300 ease-in-out">Experienced Trainers</h2>
          <p className="mt-2 text-gray-600">
            Our trainers are experienced professionals who will help you achieve your fitness goals.
          </p>
          <Link to="/trainers" className="mt-4 inline-block text-green-500 hover:text-green-700 transition duration-300 ease-in-out">
            Meet our trainers &rarr;
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-green-500 transition duration-300 ease-in-out">State-of-the-Art Equipment</h2>
          <p className="mt-2 text-gray-600">
            We provide the best equipment to ensure you get the most out of your workouts.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-green-500 transition duration-300 ease-in-out">Variety of Classes</h2>
          <p className="mt-2 text-gray-600">
            We offer a variety of classes to keep your workouts interesting and effective.
          </p>
          <Link to="/classes" className="mt-4 inline-block text-green-500 hover:text-green-700 transition duration-300 ease-in-out">
            Explore our classes &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center hover:text-green-500 transition duration-300 ease-in-out">Our Mission</h2>
        <p className="mt-4 text-gray-600 text-center">
          Our mission is to provide a friendly and motivating environment for everyone to achieve their fitness goals. Whether you are a beginner or an experienced athlete, we have the resources and support you need to succeed.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center hover:text-green-500 transition duration-300 ease-in-out">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <img src="/assets/trainer.jpg" alt="Experienced Trainers" className="w-full rounded-lg" />
            <h3 className="text-xl font-bold text-gray-800 mt-4 hover:text-green-500 transition duration-300 ease-in-out">Experienced Trainers</h3>
            <p className="mt-2 text-gray-600">
              Our trainers are certified and have years of experience.
            </p>
          </div>
          <div className="text-center">
            <img src="/assets/equipment.jpg" alt="Modern Equipment" className="w-full rounded-lg" />
            <h3 className="text-xl font-bold text-gray-800 mt-4 hover:text-green-500 transition duration-300 ease-in-out">Modern Equipment</h3>
            <p className="mt-2 text-gray-600">
              We have the latest and most advanced fitness equipment.
            </p>
          </div>
          <div className="text-center">
            <img src="/assets/classes.jpg" alt="Diverse Classes" className="w-full rounded-lg" />
            <h3 className="text-xl font-bold text-gray-800 mt-4 hover:text-green-500 transition duration-300 ease-in-out">Diverse Classes</h3>
            <p className="mt-2 text-gray-600">
              We offer a variety of classes to suit all fitness levels.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center hover:text-green-500 transition duration-300 ease-in-out">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600">
              "I've been a member for a year, and I've never felt better. The trainers are amazing, and the equipment is top-notch."
            </p>
            <p className="mt-4 text-gray-800 font-bold">- John Doe</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600">
              "The variety of classes keeps me motivated and excited to work out every day."
            </p>
            <p className="mt-4 text-gray-800 font-bold">- Jane Smith</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center hover:text-green-500 transition duration-300 ease-in-out">Join Us Today!</h2>
        <p className="mt-4 text-gray-600 text-center">
          Become a member and enjoy all the benefits our gym has to offer. From top-notch equipment to expert trainers, we have everything you need to reach your fitness goals.
        </p>
        <div className="text-center mt-4">
          <Link to="/signup">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
