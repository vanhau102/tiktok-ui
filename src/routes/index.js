
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import { HeaderOnly } from '~/components/Layouts';
import Search from '~/pages/Search';
import routesConfig from '~/config/routes';

// public Route
const publicRoute = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.follwing, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
]
const privateRoute = [];

export { publicRoute, privateRoute }