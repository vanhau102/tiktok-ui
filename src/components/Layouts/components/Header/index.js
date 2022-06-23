import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);


function Header() {
	const [searchResult, setSearchResult] = useState([])
	useEffect(() => {
		setTimeout(() => {
			setSearchResult([])
		}, 3000)
	})

	return <header className={cx("wrapper")}>
		<div className={cx("inner")}>
			<div className={cx("logo")}>
				<img src={images.logo} alt='TikTok' />
			</div>
			<Tippy
				interactive={true}
				visible={searchResult.length > 0}
				render={(attrs) => (
					<div className={cx("search-result")} tabIndex='-1' {...attrs}>
						<WrapperPopper>
							<h4 className={cx('search-title')}> Accounts</h4>
							<AccountItem />
							<AccountItem />
							<AccountItem />
							<AccountItem />
						</WrapperPopper>
					</div>
				)
				}
			>
				<div className={cx("search")}>
					<input placeholder="Tìm kiếm tài khoản và video" />
					<button className={cx("clear")}>
						<FontAwesomeIcon icon={faCircleXmark} />
					</button>
					<FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
					<button className={cx('search-btn')}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</Tippy>
			<div className={cx("actions")}>
				<Button text >Upload</Button>
				<Button primary >Log in</Button>
			</div>
		</div>
	</header>
}

export default Header;