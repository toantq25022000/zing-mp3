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

export const handlePlaySongFn = (song, songId, isRandom, isPlay, playlists, songSlice, dispatch) => {
    if (isRandom) dispatch(songSlice.actions.setIsRandom(false));
    if (songId === song.encodeId) {
        if (isPlay) {
            dispatch(songSlice.actions.setIsPlay(false));
        } else {
            dispatch(songSlice.actions.setIsPlay(true));
        }
    } else {
        dispatch(songSlice.actions.setSongId(song.encodeId));
        dispatch(songSlice.actions.setIsPlay(true));

        dispatch(songSlice.actions.setCurrentIndexSong(getCurrentIndexSongOfPlaylist(playlists, song)));
    }
};

export const setNumberToThounsandLike = (number) => {
    if (number < 1000) return number;
    const result = Math.floor(number / 1000);
    if (result >= 1000) return (result / 1000).toFixed(1) + 'M';
    return result + 'K';
};

const handleEncodeStyle = (style) => {
    style.replace(/\"/gi, '"');
    const arraySplitSyle = style.split(',"').map((item) => item.replace(/\"/gi, '').replace(/"/gi, ''));
    return arraySplitSyle.join(';');
};

export const handleSetThemeWebsite = (theme) => {
    let themeResult = { ...theme };
    const htmlElement = document.getElementsByTagName('html')[0];
    const bgLayout = document.querySelector('.zm-layout');

    if (theme.dynamic) {
        const hoursCurrent = new Date().getHours();
        const dynamicResult = theme.dynamic.find(
            (item) => hoursCurrent >= item.start.hours && item.end.hours > hoursCurrent,
        );
        themeResult = dynamicResult;
    }

    //Set attr for element HTML
    htmlElement.setAttribute('data-theme', themeResult.theme);
    htmlElement.setAttribute('data-themeid', themeResult.id);

    //Set background for website

    themeResult.bgImg
        ? (bgLayout.style.backgroundImage = `url(${themeResult.bgImg})`)
        : (bgLayout.style.backgroundImage = 'none');
    themeResult.className
        ? htmlElement.setAttribute('class', themeResult.className)
        : htmlElement.removeAttribute('class');
    if (themeResult.style) {
        htmlElement.setAttribute('style', handleEncodeStyle(themeResult.style));
    } else {
        htmlElement.removeAttribute('style');
    }
};

export const getCurrentIndexSongOfPlaylist = (playlists, song) => {
    return playlists.findIndex((item) => item.encodeId === song.encodeId);
};

export const ChangeToSlug = (slug) => {
    //?????i k?? t??? c?? d???u th??nh kh??ng d???u
    slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
    slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
    slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
    slug = slug.replace(/??|???|???|???|???/gi, 'y');
    slug = slug.replace(/??/gi, 'D');
    slug = slug.replace(/??/gi, 'd');
    //X??a c??c k?? t??? ?????t bi???t
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
    slug = slug.replace(/ /gi, '-');
    //?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
    //Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};

export const handleClickToStopPropagation = (e) => {
    e.stopPropagation();
};
