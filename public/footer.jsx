import React from 'react';
import {Footer, InstaIcon} from './style';

const footer = () => {
    return (<Footer>
        <div>
            <div>
                <a href="https://ksw7581.github.io/kswWebsite/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="96"
                         height="72" viewBox="0 0 336.000000 287.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,287.000000) scale(0.100000,-0.100000)" fill="#000000"
                           stroke="none">
                            <path
                                d="M840 1435 l0 -845 845 0 845 0 0 845 0 845 -845 0 -845 0 0 -845z m473 751 c63 -19 104 -50 128 -98 25 -48 21 -53 -59 -62 -40 -5 -58 -3 -61 5 -15 45 -96 69 -169 50 -48 -13 -68 -41 -52 -71 15 -29 37 -38 157 -64 142 -30 186 -54 219 -118 21 -41 18 -141 -6 -188 -51 -100 -235 -150 -379 -103 -60 19 -133 78 -151 124 -16 38 -9 44 66 53 52 6 56 5 89 -28 38 -39 97 -53 162 -41 57 10 83 31 83 65 0 41 -27 56 -143 79 -119 25 -153 39 -194 80 -96 99 -45 267 96 317 48 17 157 17 214 0z m440 -208 c33 -115 63 -208 66 -208 4 0 26 80 50 178 24 97 48 192 53 210 l9 32 69 0 69 0 10 -37 c5 -21 29 -112 52 -203 23 -91 45 -170 48 -177 4 -7 33 84 66 202 l60 215 63 0 64 0 -7 -27 c-3 -16 -45 -163 -94 -328 l-87 -300 -70 -3 -69 -3 -54 216 c-29 118 -56 217 -60 219 -4 3 -31 -94 -61 -215 l-54 -219 -72 0 -71 0 -88 288 c-49 158 -94 306 -101 330 l-13 43 81 -3 81 -3 60 -207z m-338 -811 l130 -54 0 -48 0 -48 -233 -98 c-128 -53 -240 -100 -248 -103 -11 -4 -14 5 -14 47 l0 52 175 74 c96 41 175 75 175 76 0 1 -79 36 -175 76 l-175 74 0 52 0 52 118 -49 c64 -27 176 -73 247 -103z m565 -317 l0 -40 -220 0 -220 0 0 40 0 40 220 0 220 0 0 -40z"/>
                        </g>
                    </svg>
                </a>
            </div>
            <div>
                <div>Copyright ⓒ 2020 All rights reserved.</div>
                <div>
                    <div>Developed by </div>
                    <a href="">
                        <InstaIcon />
                        <div>James Kim</div>
                    </a>
                </div>
            </div>
        </div>
    </Footer>);
}

export default footer;
