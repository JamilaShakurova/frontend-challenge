import React, {useEffect, useRef, useState} from 'react';
import './AllCats.scss';
import CatCardItem from '../CatCardItem/CatCardItem';
import {AppDispatch, getCats, ICat} from '../../store';
import axios from 'axios';

import {useDispatch} from 'react-redux';
import {url} from "../App/App";

type AllCatsProps = {
    data: ICat[];
}

const AllCats: React.FC<AllCatsProps> = ({data}) => {
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [lastElement, setLastElement] = useState(null);

    const dispatch = useDispatch<AppDispatch>();
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPageNum((no) => no + 1);
                }
            })
    );

    const callCat = async () => {
        setLoading(true);
        let response = await axios.get(
            url
        );
        const filteredData = response.data.filter((item: ICat) => data.find(element => element.id === item.id) === undefined)
        dispatch(getCats([...data, ...filteredData]));
        setLoading(false);
    };

    useEffect(() => {
        callCat();
    }, [pageNum]);


    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);


    return (<section className='Cat'>
        { data.length ?
            <div className='Cat__list'>
                {
                    data.map((element: any) => <div ref={setLastElement as unknown as React.RefObject<HTMLDivElement>}  key={element.id}><CatCardItem data={element} /></div>)
                }
            </div> : <p>...У тебя еще нет любимых котиков :(...</p>
        }
        {loading && <p className='text-center'>... загружаем еще котиков ...</p>}
    </section>)
};

export default AllCats;
