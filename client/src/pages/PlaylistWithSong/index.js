import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '~/utils/axios';

function PlaylistWithSong() {
    const navigate = useNavigate();
    const { id } = useParams();
    const idSong = id.toString().split('.')[0];
    const [isPlaylist, setIsPlaylist] = useState(true);
    useEffect(() => {
        instance
            .get(`/song/info?id=${idSong}`)
            .then((res) => {
                if (res.data) {
                    if (res.data.album) {
                        navigate(res.data.album.link);
                    } else {
                        setIsPlaylist(false);
                    }
                }
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return !isPlaylist && <div>Chức năng đang phát triển</div>;
}

export default PlaylistWithSong;
