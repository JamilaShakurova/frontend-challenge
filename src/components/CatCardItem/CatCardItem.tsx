import React, {useState} from 'react';
import './CatCardItem.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {changeFavorite, ICat, AppDispatch} from '../../store';
import {useDispatch} from 'react-redux';

type CatCardItemProps = {
    data: ICat;
}

const CatCardItem: React.FC<CatCardItemProps> = ({data}) => {
    const [catData, setCatData] = useState({...data, isFavorite: false});
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (evt: any): void => {
        evt.preventDefault();
        setCatData({...catData, isFavorite: !catData.isFavorite});
        dispatch(changeFavorite({id: catData.id, isFavorite: !catData.isFavorite}))
    }

    const handleMouseOver = (): void => {
        setHover(true)
    }

    const handleMouseLeave = (): void => {
        setHover(false)
    }

    return (<li className='Cat__card-item'>
        <img src={catData.url} alt=""/>
        <button className='Cat__favorite-btn' onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            {
                catData.isFavorite || hover ?
                    <FavoriteIcon className='Cat__favorite-icon'/> :
                    <FavoriteBorderOutlinedIcon className='Cat__favorite-icon'/>
            }
        </button>

    </li>)
};

export default CatCardItem;
