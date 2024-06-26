import styles from "./App.css";
import { useEffect, useState } from "react";
import { getCatData } from "./api";

function App() {
  const [cats, setCats] = useState();
  const [selectedCat, setSelectedCat] = useState();

  useEffect(() => {
      getCatData().then((data) => {
        setCats(data);
        if (!selectedCat) {
          setSelectedCat(data[0]);
        }
      });
  }, [cats, selectedCat]);

  function handleTypeSelector(event) {
    setSelectedCat(cats.find((c) => c.type === event.target.value));
  }

  let content = <p>Loading...</p>;
  if (cats && selectedCat) {
    content = (
      <form>
        <img alt="Cat" src={selectedCat.img}/>

        <div className="container">
          <div className="form-group">
            <label>Cat Type</label>
            <select onChange={handleTypeSelector}>
              {cats.map((cat) => (
                <option key={cat.type} value={cat.type}> {cat.type} </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Brain Cells</label>
            <select>
              {selectedCat.brainCellArr.map((brainCell) => (
                <option key={brainCell} value={brainCell}> {brainCell} </option>
              ))}
            </select>
          </div>
        </div>

      </form>
    );
  }

  return content;
}

export default App;
