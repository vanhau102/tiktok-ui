import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faKeyboard, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAsia} />,
		title: 'English',
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion} />,
		title: 'Feelback and Help',
		to: '/feelback',
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shorcuts',
	},

]

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
						<PopperWrapper>
							<h4 className={cx('search-title')}> Accounts</h4>
							<AccountItem />
							<AccountItem />
							<AccountItem />
							<AccountItem />
						</PopperWrapper>
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
				<Menu
					items={MENU_ITEMS}
				>
					<button className={cx('more-btn')}>
						<FontAwesomeIcon icon={faEllipsisVertical} />
					</button>
				</Menu>
			</div>
		</div>
	</header>
}

export default Header;