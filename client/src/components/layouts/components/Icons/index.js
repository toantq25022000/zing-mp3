import './Icons.css';

export const ThemeIcon = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="2rem" height="2rem" viewBox="0 0 20 20">
            <defs>
                <linearGradient id="j32lhg93hd" x1="62.206%" x2="18.689%" y1="70.45%" y2="39.245%">
                    <stop offset="0%" stopColor="#F81212"></stop>
                    <stop offset="100%" stopColor="red"></stop>
                </linearGradient>
                <linearGradient id="hjoavsus6g" x1="50%" x2="11.419%" y1="23.598%" y2="71.417%">
                    <stop offset="0%" stopColor="#00F"></stop>
                    <stop offset="100%" stopColor="#0031FF"></stop>
                </linearGradient>
                <linearGradient id="la1y5u3dvi" x1="65.655%" x2="25.873%" y1="18.825%" y2="56.944%">
                    <stop offset="0%" stopColor="#FFA600"></stop>
                    <stop offset="100%" stopColor="orange"></stop>
                </linearGradient>
                <linearGradient id="2dsmrlvdik" x1="24.964%" x2="63.407%" y1="8.849%" y2="55.625%">
                    <stop offset="0%" stopColor="#13EFEC"></stop>
                    <stop offset="100%" stopColor="#00E8DF"></stop>
                </linearGradient>
                <filter id="4a7imk8mze" width="230%" height="230%" x="-65%" y="-65%" filterUnits="objectBoundingBox">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                </filter>
                <filter
                    id="301mo6jeah"
                    width="312.7%"
                    height="312.7%"
                    x="-106.4%"
                    y="-106.4%"
                    filterUnits="objectBoundingBox"
                >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                </filter>
                <filter
                    id="b2zvzgq7fj"
                    width="295%"
                    height="295%"
                    x="-97.5%"
                    y="-97.5%"
                    filterUnits="objectBoundingBox"
                >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                </filter>
                <filter id="a1wq161tvl" width="256%" height="256%" x="-78%" y="-78%" filterUnits="objectBoundingBox">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                </filter>
                <path
                    id="qtpqrj1oda"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                ></path>
                <path id="jggzvnjgfc" d="M0 0H20V20H0z"></path>
                <path
                    id="2eiwxjmc7m"
                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                ></path>
            </defs>
            <g fill="none" fillRule="evenodd" transform="translate(2 3)">
                <mask id="tinejqaasb" fill="#fff">
                    <use xlinkHref="#qtpqrj1oda"></use>
                </mask>
                <use fill="#FFF" fillOpacity="0" xlinkHref="#qtpqrj1oda"></use>
                <g mask="url(#tinejqaasb)">
                    <g transform="translate(-2 -3)">
                        <mask id="uf3ckvfvpf" fill="#fff">
                            <use xlinkHref="#jggzvnjgfc"></use>
                        </mask>
                        <use fill="#D8D8D8" xlinkHref="#jggzvnjgfc"></use>
                        <circle
                            cx="8.9"
                            cy="6.8"
                            r="9"
                            fill="url(#j32lhg93hd)"
                            filter="url(#4a7imk8mze)"
                            mask="url(#uf3ckvfvpf)"
                        ></circle>
                        <circle
                            cx="9.3"
                            cy="13.7"
                            r="5.5"
                            fill="url(#hjoavsus6g)"
                            filter="url(#301mo6jeah)"
                            mask="url(#uf3ckvfvpf)"
                        ></circle>
                        <cirfillOpacitycle
                            cx="15.9"
                            cy="6.9"
                            r="6"
                            fill="url(#la1y5u3dvi)"
                            filter="url(#b2zvzgq7fj)"
                            mask="url(#uf3ckvfvpf)"
                        ></cirfillOpacitycle>
                        <circle
                            cx="16.4"
                            cy="17.7"
                            r="7.5"
                            fill="url(#2dsmrlvdik)"
                            filter="url(#a1wq161tvl)"
                            mask="url(#uf3ckvfvpf)"
                        ></circle>
                    </g>
                </g>
                <use fill="#FFF" fillOpacity="0.05" xlinkHref="#2eiwxjmc7m"></use>
            </g>
        </svg>
    );
};

export const KaraokeIcon = ({ className }) => {
    return (
        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className={className}>
            <path
                d="M13.426 2.574a2.831 2.831 0 00-4.797 1.55l3.247 3.247a2.831 2.831 0 001.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 004.74 9.075L2.065 12.12a1.287 1.287 0 001.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 114.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 01-3.933-3.933l2.676-3.045 3.505-3.99z"
                fill="currentColor"
            ></path>
        </svg>
    );
};

export const LoopIcon = ({ className }) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            width="17"
            height="17"
            viewBox="0 0 17 17"
        >
            <g></g>
            <path
                d="M1 9c0 2.206 1.711 4 3.813 4v1c-2.654 0-4.813-2.243-4.813-5s2.159-5 4.813-5h4.229l-1.646-1.646 0.707-0.707 2.854 2.853-2.853 2.854-0.708-0.708 1.647-1.646h-4.23c-2.102 0-3.813 1.794-3.813 4zM12.187 4v1c2.102 0 3.813 1.794 3.813 4s-1.711 4-3.813 4h-4.23l1.646-1.646-0.707-0.707-2.853 2.853 2.854 2.854 0.707-0.707-1.647-1.647h4.229c2.655 0 4.814-2.243 4.814-5s-2.159-5-4.813-5z"
                fill="currentColor"
            />
        </svg>
    );
};

export const RepeatOneIcon = ({ className }) => {
    return (
        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" version="1.1" className={className}>
            <g>
                <g id="svg_1" />
                <path
                    id="svg_2"
                    fill="currentColor"
                    d="m1,9c0,2.206 1.711,4 3.813,4l0,1c-2.654,0 -4.813,-2.243 -4.813,-5s2.159,-5 4.813,-5l4.229,0l-1.646,-1.646l0.707,-0.707l2.854,2.853l-2.853,2.854l-0.708,-0.708l1.647,-1.646l-4.23,0c-2.102,0 -3.813,1.794 -3.813,4zm11.187,-5l0,1c2.102,0 3.813,1.794 3.813,4s-1.711,4 -3.813,4l-4.23,0l1.646,-1.646l-0.707,-0.707l-2.853,2.853l2.854,2.854l0.707,-0.707l-1.647,-1.647l4.229,0c2.655,0 4.814,-2.243 4.814,-5s-2.159,-5 -4.813,-5z"
                />

                <text
                    font-weight="bold"
                    transform="matrix(1 0 0 0.698696 0.458494 1.18756)"
                    stroke="#000"
                    xmlSpace="preserve"
                    textAnchor="start"
                    fontFamily="'Noto Sans Display'"
                    fontSize="12"
                    id="svg_11"
                    y="8.02564"
                    x="8.76595"
                    strokeWidth="0"
                    fill="currentColor"
                >
                    1
                </text>
            </g>
        </svg>
    );
};

export const ShuffleIcon = ({ className }) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            width="17"
            height="17"
            viewBox="0 0 17 17"
        >
            <g></g>
            <path
                d="M8.94 6.871l1.081-1.34-0.004-0.003c0.855-0.971 2.087-1.528 3.378-1.528h1.898l-1.646-1.646 0.707-0.707 2.853 2.853-2.854 2.854-0.707-0.707 1.647-1.647h-1.898c-0.989 0-1.931 0.425-2.595 1.159l-1.080 1.339-0.78-0.627zM5.851 10.696l-0.011-0.008c-0.667 0.833-1.663 1.312-2.733 1.312h-3.107v1h3.107c1.369 0 2.645-0.611 3.503-1.676l0.011 0.009 0.941-1.166-0.777-0.629-0.934 1.158zM13.646 10.354l1.647 1.646h-1.898c-1.052 0-2.031-0.469-2.7-1.281l-4.269-5.265-0.010 0.008c-0.85-0.926-2.048-1.462-3.309-1.462h-3.107v1h3.107c0.998 0 1.948 0.428 2.611 1.17l4.161 5.132-0.005 0.004c0.86 1.076 2.143 1.694 3.52 1.694h1.898l-1.646 1.646 0.707 0.707 2.854-2.854-2.854-2.854-0.707 0.709z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SpinnerLoadIcon = () => {
    return (
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
