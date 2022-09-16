/* eslint-disable no-useless-escape */
export const secondsToTime = (second) => {
    const m = Math.floor((second % 3600) / 60)
            .toString()
            .padStart(2, '0'),
        s = Math.floor(second % 60)
            .toString()
            .padStart(2, '0');

    return m + ':' + s;
    //return `${m}:${s}`;
};

export const handlePlaySongRandom = (currentIndexSong, playlists, arrayIndexRandom, dispatch, songSlice) => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * playlists.length);
    } while (newIndex === currentIndexSong || arrayIndexRandom.includes(newIndex));

    const updateArrayIndexRandom = [...arrayIndexRandom, newIndex];

    dispatch(songSlice.actions.setArrayIndexRandom(updateArrayIndexRandom));
    dispatch(songSlice.actions.setCurrentIndexSong(newIndex));
    dispatch(songSlice.actions.setSongId(playlists[newIndex].encodeId));
    dispatch(songSlice.actions.setIsPlay(true));
};

export const setNumberToThounsandLike = (number) => {
    if (number < 1000) return number;
    return Math.floor(number / 1000) + 'K';
};

export const handleSetThemeWebsite = (theme) => {
    const htmlElement = document.getElementsByTagName('html')[0];
    const bgLayout = document.querySelector('.zm-layout');
    //Set attr for element HTML
    htmlElement.setAttribute('data-theme', theme.theme);
    htmlElement.setAttribute('data-themeid', theme.id);
    if (theme.style) {
        htmlElement.style = theme.style;
    } else {
        htmlElement.removeAttribute('style');
    }

    //Set background for website
    if (theme.bgImg) {
        bgLayout.style.backgroundImage = `url(${theme.bgImg})`;
        htmlElement.setAttribute('class', 'theme-bg-image');
    } else {
        htmlElement.removeAttribute('style');
        bgLayout.removeAttribute('style');
        htmlElement.removeAttribute('class');
    }
};

export const getCurrentIndexSongOfPlaylist = (playlists, song) => {
    return playlists.indexOf(song);
};

export const ChangeToSlug = (slug) => {
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/Đ/gi, 'D');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, '-');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};
