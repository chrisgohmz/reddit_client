import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectSearchTerm, setSearchTerm} from '../../store/redditSlice';
import {IoLogoReddit} from 'react-icons/io';
import {GoSearch} from 'react-icons/go';
import './Header.css';

const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const onSearchTermChange = ({target}) => {
        setSearchTermLocal(target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const onSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    };


    return (
        <header>
          <div className="logo">
            <IoLogoReddit className="logo-icon"></IoLogoReddit>
            <p>
              Reddit<span>Mini</span>
            </p>
          </div>
          <form className="search" onSubmit={onSearchTermSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchTermLocal}
              onChange={onSearchTermChange}
              aria-label="Search posts"
            />
            <button type="submit" onClick={onSearchTermSubmit} aria-label="Search">
              <GoSearch />
            </button>
          </form>
        </header>
    );
};

export default Header;