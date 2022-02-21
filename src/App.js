import "./App.css";

import Navbar from "./component/Navbar";
import Searchbar from "./component/searchbar/searchbar";
import BoxResults from "./component/boxresults/BoxResults";

import { selectAtResults, selectDisplayComponent, selectPage } from "./Redux/slices/navigationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import getRoute from "./routes"
import { initStore } from "./Redux/slices/azelis/azelisSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initStore());
  }, [])

  const DisplayComponent = useSelector(selectDisplayComponent);

  return (
    <div className="main">
      <Searchbar />
      <Navbar />
      <DisplayComponent />
    </div>
  );
}

export default App;
