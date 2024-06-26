'use client'
import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR('/api/users', fetcher);
  const [users, setUsers] = useState([]);
  const [handicap, setHandicap] = useState(null);

  
  useEffect(() => {
    if (data) {
      const diffs = data.rows.map(row => Number(row.differential))
      if (diffs.length >= 3) {
        const sortedDiffs = diffs.sort((a, b) => a - b);
        const lowestEights = sortedDiffs.slice(0, 8);
        const sumOfLowestEights = lowestEights.reduce((a, b) => a + b, 0);
        const calculatedHandicap = sumOfLowestEights / lowestEights.length || 8;
        
        setHandicap(calculatedHandicap.toFixed(1));
      } else {
        console.log('Not enough data to calculate handicap');
      }
    }
  }, [data]);  

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='text-center'>Handicap Index: {handicap}</h1>
      <h1 className='text-center'>Recent Rounds</h1>
      {data?.rows.map((round) => (
         <div key={round.round_id} className="max-w-sm mx-auto my-10 p-5 bg-gray-300 rounded-lg shadow-lg">
         <div className="mb-2">
           <p className="text-gray-600">{round.date_played} </p>
         </div>
         <div key={round.id}  className="mb-2">
           <p className="text-lg text-gray-800">{round.course_name}</p>
           <p className="text-gray-600">Rating: {round.course_rating}</p>
           <p className="text-gray-600">Slope: {round.slope}</p>
           <p>Tees: {round.tees}</p>
           <p>Differential: {round.differential}</p>
         </div>
         <div key={round.id}  className="mb-2">
           <p className="text-lg font-semibold text-gray-900">Score: {round.score}</p>
         </div>
       </div>
      ))}

    </div>
  );
}
