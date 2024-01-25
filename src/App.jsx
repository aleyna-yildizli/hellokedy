import { Switch, Route, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { favorilereEkle } from './store/actions';
import './App.css'
import { useEffect, useState } from 'react';
import  axios  from 'axios';
import FavCats from './components/FavCats';


function App() {
  const favCats = useSelector((store) => store.favCats);
  const [fact, setFact] = useState("");
  const dispatch = useDispatch();
  const lsKey = 'hellokedy-pro-ls-key';

  useEffect(() => {
    //localstoragedan ls key ile datayı çek (readFromLocalStorage)
    const localFavCats =  readFromLocalStorage(lsKey);
    if (localFavCats?.length > 0) {
      //okuduğum datayı favlistemde tut
      localFavCats.map((cat) => (
        dispatch(favorilereEkle(cat))
      ));
    }

    yeniKediGetir();
  }, [])

  function baskaKediHandler() {
    yeniKediGetir();
  };

  function favorilereEkleHandler() {
      const newCat = {
        title: fact,
        id: favCats.length + 1
      }
      
      dispatch(favorilereEkle(newCat));
  }

  const  yeniKediGetir = async () => {
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      setFact(response.data.fact);
    } catch (error) {
      console.error('Error setting up the request:', error?.message);
    }
 }
    //favCats değişince localstorageyi
  useEffect(()=>{
  setToLocalStorage(lsKey,favCats)
  },[favCats])



// local storage'a yaz
const setToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
// local storage'dan al 
const readFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


  return (
    <div className="wrapper max-w-2xl mx-auto">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/listem"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
        <div className="flex gap-3 justify-end py-3">
                
                {fact}  

                <button
                  onClick={baskaKediHandler}
                  className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                >
                 Başka bir tane
                </button>
                <button
                  onClick={favorilereEkleHandler}
                  className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                >
                  Favorilere ekle
                </button>
                </div>
        </Route>

        <Route path="/listem">
          <div>
            {favCats.map((cat) => (
              <FavCats title={cat.title} id={cat.id} key={cat.id}/>
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App
