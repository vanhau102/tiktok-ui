import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleXmark, faCloudArrowUp, faEarthAsia, faMessage, faEllipsisVertical, faKeyboard, faMagnifyingGlass, faSpinner, faUpload, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, SearchIcon } from '~/components/Icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAsia} />,
		title: 'English',
		children: {
			title: 'Language',
			data: [
				{
					type: 'language',
					code: 'en',
					title: 'English',
				},
				{
					type: 'language',
					code: 'vn',
					title: 'Tiếng Việt',
				},
			]
		},
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
	const [searchResult, setSearchResult] = useState([]);

	const currentUser = true;

	useEffect(() => {
		setTimeout(() => {
			setSearchResult([])
		}, 3000)
	})

	//Handle logic
	const hadleMauChange = (menuItem) => {
		switch (menuItem.type) {
			case 'language':

				break;

			default:
				break;
		}

	}
	const userMenu = [
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'View profile',
			to: '/@hoaa',
		},
		{
			icon: <FontAwesomeIcon icon={faCoins} />,
			title: 'Get coins',
			to: '/coin',
		},
		{
			icon: <FontAwesomeIcon icon={faGear} />,
			title: 'Settings',
			to: '/settings',
		},
		...MENU_ITEMS,
		{
			icon: <FontAwesomeIcon icon={faSignOut} />,
			title: 'Log out',
			to: '/logout',
			separate: true,
		},
	]

	return <header className={cx("wrapper")}>
		<div className={cx("inner")}>
			<div className={cx("logo")}>
				<img src={images.logo} alt='TikTok' />
			</div>
			<HeadlessTippy
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
						<SearchIcon />
					</button>
				</div>
			</HeadlessTippy>


			<div className={cx("actions")}>
				{currentUser ?
					(
						<>
							<Tippy delay={[0, 50]} content='Message' placement='bottom'>
								<button className={cx("action-btn")}>
									<MessageIcon />
								</button>
							</Tippy>
							<Tippy delay={[0, 50]} content='Inbox' placement='bottom'>
								<button className={cx("action-btn")}>
									<InboxIcon />
									<span className={cx('badge')}>12</span>
								</button>
							</Tippy>

						</>
					)
					: (
						<>
							<Button text >Upload</Button>
							<Button primary >Log in</Button>
						</>
					)
				}
				<Menu
					items={currentUser ? userMenu : MENU_ITEMS}
					onChange={hadleMauChange}
				>
					{currentUser ? (
						<Image
							src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f75993e97bd5424690cb3c702fc88b0d~c5_100x100.jpeg?x-expires=1656745200&x-signature=y1bgzT6TmgNDRUwHDJphSPZQf7Q%3D'
							className={cx('user-avatar')}
							alt="Nguyen Van A"
							fallback='https://lh3.googleusercontent.com/lCMfKZHx7pQqMPCSGCmK5P-mKJjpzvA8RU7OQ-N5asI1pIpRU_b9GU-mDMsHhzrnoRNlSuOUIGGJawNP4xZkMccyBClOCEvHzaDe16d4Bz69O8u48wlovL7r6gAOv-Yi-xTfmUED76w3Jama8A'
						/>
					) : (
						<button className={cx('more-btn')} >
							<FontAwesomeIcon icon={faEllipsisVertical} />
						</button>
					)}
				</Menu>
			</div>
		</div>
	</header >
}

export default Header;