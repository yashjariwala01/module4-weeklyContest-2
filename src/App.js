import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [userData, setUserData] = useState([])
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    .then(response=>{
      console.log(response.data);
      setUserData(response.data);
      setLoading(false);
    })
    .catch(error=>{
      console.log(error.message);
      setLoading(false);
    })
  },[])

  return (
    <div className="App">
      {loading ? ("loading" ):(
        <>
      <div className='App'>
        {userData.map(data=>(
          <UserCard 
          key={data.id}
          name={data.name}
          symbol={data.symbol}
          img={data.image}
          currentPrice={data.current_price}
          volumn={data.total_volume}
          />
        ))}
     </div>
      </>
  )}
  </div>
  )
}

const UserCard=({name,symbol,img,currentPrice,volumn})=> ( 
<td className='ind'>
  <img src={img} alt="image" />
  <h3>{name}</h3>
  {<h5>{symbol.toUpperCase()}</h5>}  
  <p>${currentPrice}</p>
  <p>${volumn}</p>
</td>
)

export default App;
