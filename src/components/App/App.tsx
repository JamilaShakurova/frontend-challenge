import './App.scss';
import AllCats from '../AllCats/AllCats';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getCats, RootState, ICat, AppDispatch} from '../../store';
import {useEffect, useState} from 'react';
import axios from 'axios';

export const url = 'https://api.thecatapi.com/v1/images/search?limit=15';

function App() {
    const [favCats, setFavCats] = useState<ICat[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const cats: ICat[] = useSelector((state: RootState) => state.cats);

    useEffect(() => {
        (async () => {

            const res = await axios.get(url)
            dispatch(getCats(res.data))
        })()
    }, []);

    useEffect(() => {
        setFavCats(cats.filter(cat => cat.isFavorite));
    }, [cats])

    return (

        <div className='App'>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={AppRoute.FavoritesCats} element={<AllCats data={favCats}/>}/>
                    <Route path={AppRoute.AllCats} element={<AllCats data={cats}/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
