import axios from 'axios'
import dotenv from 'dotenv'
import React, { useEffect, useState } from 'react'
import Chart from './Chart'

const Home = () => {

    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [food, setFood] = useState('')

    dotenv.config

    const apiKey = import.meta.env.VITE_API_KEY;
    // let search = e.target.value

    const handleChange = (e) => {
        setFood(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (food.trim() !== '') {
            await fetchData(food);
        }
    };

    const fetchData = async (query) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${apiKey}`
            );
            setResult(response.data); // access actual food items
            console.log(response.data)
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='container overflow-hidden'>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <div className="p-4 pt-8 md:w-1/2 text-slate-800 text-center md:text-left">
                    <h2 className="text-lg font-semibold">Welcome to.</h2>
                    <h1 className="text-4xl font-bold">Food Nutrient</h1>
                    <h2 className="text-lg font-semibold">Eat Better – Check Your Food First!</h2>
                    <p className="mt-8">
                        Discover healthy recipes and check food nutrients in one place! Our easy-to-use web app helps you find delicious meals while tracking calories, vitamins, and minerals. Make smarter eating choices with real-time nutrition info. Perfect for health-conscious users, meal planners, and fitness lovers. Start your journey to better eating today—quick, simple, and accurate!
                    </p>
                </div>
                <div className="md:w-1/2 w-full flex justify-center">
                    <img className="w-[26rem] max-w-md md:max-w-full" src="hero_pic.png" alt="picture of nutrient of foods" />
                </div>
            </div>


            <div className='container'>
                <form
                    onSubmit={handleSubmit}
                    className="flex max-w-md md:w-full px-4 py-3 rounded-md border-2 border-slate-400 overflow-hidden focus-within:border-slate-600"
                >
                    <input
                        type="text"
                        placeholder="Enter the food name"
                        value={food}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent text-gray-700 text-md"
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                        </svg>
                    </button>
                </form>

            </div>

            {/* Response */}
            <div className="mt-6 px-4">
                {loading && <img src='loading.gif' className='w-56 rounded-full m-auto mb-3' />}
                {error && <p className="text-red-500">Something went wrong. Please try again.</p>}

                {result?.foods?.[0] ? (
                    <div className="w-full md:w-full max-w-2xl pt-6 mb-6">
                        <h3 className="text-xl font-bold text-center bg-gray-200 p-3">
                            {result.foods[0].description}
                        </h3>
                        <div className="overflow-x-auto border border-gray-200">
                            <table className="w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b">Nutrient</th>
                                        <th className="px-4 py-2 text-left border-b">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.foods[0].foodNutrients?.map((nutrient, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{nutrient.nutrientName}</td>
                                            <td className="px-4 py-2 border-b">
                                                {nutrient.value ?? 'N/A'} {nutrient.unitName}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="p-4"></p>
                )}
            </div>
            {/* <Chart /> */}
        </div>
    )
}

export default Home