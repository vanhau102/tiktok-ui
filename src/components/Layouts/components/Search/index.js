import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as searchSevices from '~/apiSevices/searchSevices';
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

    return (<HeadlessTippy
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
                onChange={(e) => setSearchValue(e.target.value)}
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
            <button className={cx('search-btn')}>
                <SearchIcon />
            </button>
        </div>
    </HeadlessTippy>);
}

export default Search;