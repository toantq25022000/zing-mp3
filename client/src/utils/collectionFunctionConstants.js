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

export const handleSetThemeWebsite = (theme) => {
    const htmlElement = document.getElementsByTagName('html')[0];
    const bgLayout = document.querySelector('.zm-layout');
    //Set attr for element HTML
    htmlElement.setAttribute('data-theme', theme.theme);
    htmlElement.setAttribute('data-themeid', theme.id);
    if (theme.style) {
        htmlElement.style = theme.style;
    } else {
        console.log('1');
        htmlElement.removeAttribute('style');
    }

    //Set background for website
    if (theme.bgImg) {
        bgLayout.style.backgroundImage = `url(${theme.bgImg})`;
        htmlElement.setAttribute('class', 'theme-bg-image');
    } else {
        console.log('2');
        htmlElement.removeAttribute('style');
        bgLayout.removeAttribute('style');
        htmlElement.removeAttribute('class');
    }
};
