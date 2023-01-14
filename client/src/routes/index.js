import Login from '~/components/layouts/components/Login';
import ArtistInfo from '~/pages/ArtistInfo';
import DetailPlaylist from '~/pages/DetailPlaylist';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import PlaylistWithSong from '~/pages/PlaylistWithSong';
import Radio from '~/pages/Radio';
import ZingChart from '~/pages/ZingChart';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Login, layout: null },
    { path: '/album/:name/:id', component: DetailPlaylist },
    { path: '/playlist/:name/:id', component: DetailPlaylist },
    { path: '/bai-hat/:name/:id', component: PlaylistWithSong },
    { path: '/:alias', component: ArtistInfo },
    { path: '/:alias/:type', component: ArtistInfo },
    { path: '/mymusic', component: MyMusic },
    { path: '/radio', component: Radio },
    { path: '/zing-chart', component: ZingChart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
