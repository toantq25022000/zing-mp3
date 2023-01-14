export const SETTING_NOWPLAYING_OPTION_ITEMS = [
    {
        title: 'Hình nền',
        type: 'playerFull',
        isSettingPlayer: true,
        isModeWallpaper: true,
        isCheck: false,
    },
    {
        title: 'Chỉ phát nhạc nền',
        type: 'playerFull',
        isSettingPlayer: true,
        isNoneSelected: true,
        isCheck: false,
    },
    {
        title: 'Cỡ chữ lời nhạc',
        type: 'playerFull',
        isSettingPlayer: true,
        listOptions: [
            {
                type: 'size',
                size: 'S',
            },
            {
                type: 'size',
                size: 'M',
            },
            {
                type: 'size',
                size: 'L',
            },
        ],
    },
    {
        title: 'Luôn phát toàn màn hình',
        type: 'playerFull',
        isSettingPlayer: true,
        isCheck: false,
    },
];
