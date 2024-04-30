import styles from "./App.css";
import { useEffect, useState } from "react";
import { getCatData } from "./api";

function App() {
  const [cats, setCats] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
      getCatData().then((data) => {
        setCats(data);
        // To avoid infinite refreshes
        if (!selectedCat) {
          setSelectedCat(data[0]);
        }
      });
  }, [cats, selectedCat]);

  function handleTypeSelector(event) {
    if (Array.isArray(cats)) {
      setSelectedCat(cats.find((c) => c?.type === event?.target?.value));
    }
  }

  let content = <p>Loading</p>;
  if (cats && selectedCat) {
    content = (
      <form>
        <img alt="Cat" src={selectedCat.img}/>

        <div className="container">
          <div className="form-group">
            <label>Cat Type</label>
            <select onChange={handleTypeSelector}>
              {cats.map((cat) => (
                cat.type ? <option key={cat.type} value={cat.type}> {cat.type} </option> : null
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Brain Cells</label>
            <select>
              {selectedCat?.brainCellArr && Array.isArray(selectedCat.brainCellArr) ? selectedCat.brainCellArr.map((brainCell) => (
                <option key={brainCell} value={brainCell}> {brainCell} </option>
              )) : null}
            </select>
          </div>
        </div>

      </form>
    );
  }

  return content;
}

export default App;
