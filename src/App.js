import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [listOfCoins, setListofCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins?skip=0")
      .then((response) => {
        setListofCoins(response.data.coins);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLocaleLowerCase());
  });
  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
