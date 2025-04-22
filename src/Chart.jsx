// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const Chart = ({ nutrients }) => {
//     // Filter only nutrients that have a value
//     const chartData = nutrients.map((item) => ({
//         name: item.nutrientName,
//         value: item.value,
//     }));

//     return (
//         <div className="w-full h-96 p-4">
//             <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                     <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={100} />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#4f46e5" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// // Usage
// {
//     result?.foods?.[0] && (
//         <>
//             <h3 className="text-xl font-bold mb-4">{result.foods[0].description}</h3>
//             <Chart nutrients={result.foods[0].foodNutrients} />
//         </>
//     )
// }


// export default Chart;





import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dotenv from 'dotenv'

dotenv.config

const apiKey = import.meta.env.VITE_API_KEY;

export default function App() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Simulate fetching from API
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => setResult(data))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    const nutrientData = result?.foods?.[0]?.foodNutrients.map(nutrient => ({
        name: nutrient.nutrientName,
        value: nutrient.value ?? 0,
    })) || [];

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {result ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">{result.foods[0].description}</h2>

                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={nutrientData}>
                            <XAxis dataKey="name" hide />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
