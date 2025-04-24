import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const COLORS = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'];

// Custom label with nutrient name and value
const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;

export default function Chart() {
    const [query, setQuery] = useState('apple');
    const [inputValue, setInputValue] = useState('apple');
    const [result, setResult] = useState(null);

    const fetchData = () => {
        if (!inputValue.trim()) return;
        axios
            .get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${inputValue}&api_key=${apiKey}`)
            .then(res => {
                setResult(res.data);
                setQuery(inputValue);
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchData();
    }, []); // fetch once on mount with default "apple"

    const nutrientData =
        result?.foods?.[0]?.foodNutrients
            ?.filter(n => n.value > 0)
            ?.map(nutrient => ({
                name: nutrient.nutrientName,
                value: nutrient.value ?? 0,
            })) || [];

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter food item (e.g., banana)"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={fetchData}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>

            {result ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">{result.foods[0].description}</h2>

                    <ResponsiveContainer width="100%" height={500}>
                        <PieChart>
                            <Pie
                                data={nutrientData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={180}
                                label={renderCustomLabel}
                            >
                                {nutrientData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
