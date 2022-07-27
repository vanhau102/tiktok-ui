import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as searchSevices from '~/services/searchSevice';
import { useDebounce } from '~/hooks';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return
        }
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchSevices.search(debounce);

            setSearchResult(result);
            setLoading(false);
        }
        fetchApi();
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    return (
        //Using a wrapper <div> tag around the reference element solves 
        //this by creating a new parentNode context
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx("search-result")} tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}> Accounts</h4>
                            {searchResult.map(result =>
                                <AccountItem key={result.id} data={result} />
                            )}
                        </PopperWrapper>
                    </div>
                )
                }
                onClickOutside={handleResult}
            >
                <div className={cx("search")}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm tài khoản và video"
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx("clear")}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search;