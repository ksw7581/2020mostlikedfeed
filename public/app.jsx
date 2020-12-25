import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as htmlToImage from 'html-to-image';

import Header from './header';
import Footer from './footer';
import {
    ImageBoard,
    Main,
    Search,
    Searchicon,
    Viewicon,
    Loading,
    DownShare,
    Like,
    Heart,
    ShareIcon,
    KakaoIcon,
    ImgdownIcon,
    WhatsappIcon,
} from './style'

const App = () => {
    const [isDownload, setIsdownload] = useState(false);
    const [imgstck, setImgStck] = useState([]);
    const [username, setUsername] = useState('');
    const [rowcols, setrowcols] = useState(3);
    const [isLoading, setLoading] = useState(false);
    const [Data, setData] = useState([]);

    useEffect(() => {
        window.Kakao.init('f3de5be88a845cb7e710558e41695b31');
    }, []);

    const getdata = () => {
        if (username === '') {
            alert('인스타 아이디를 입력해주세요.');
            return;
        }
        setLoading(true);
        setData([]);
        axios({
            method: 'post',
            url: `http://${location.hostname}/getdata`,
            data: {
                rowcols: rowcols,
                username: username,
            },
            withCredentials: true,
        }).then(res => {
            // setUsername('');
            setLoading(false);
            if (res.data.success === true) {
                setData(res.data.user_images);
            } else {
                alert(res.data.message);
            }
        });
    };

    const ShareKakao = () => {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '2020mostlikedfeed',
                description: '2020 여러분의 가장 핫했던 게시물을 보여드립니다.',
                imageUrl:
                    'https://swf-bucket.s3.ap-northeast-2.amazonaws.com/contentimg.png',
                link: {
                    mobileWebUrl: 'http://2020mostlikedfeed.com',
                    webUrl: 'http://2020mostlikedfeed.com',
                },
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'http://2020mostlikedfeed.com',
                        webUrl: 'http://2020mostlikedfeed.com',
                    },
                },
            ],
        })
    };

    const ShareWhatsApp = () => {

    };

    const onloadImgStck = (index) => {
        setImgStck([...imgstck, index]);
        if (imgstck.length === (Data.length - 1)) {
            downloadImage();
        }
    }

    const downloadImage = async () => {
        const result_images = document.querySelector("#downaloadImage");

        const this_width = result_images.offsetWidth;
        const this_height = result_images.offsetHeight;
        const dataUrl = await htmlToImage.toJpeg(result_images, {
            backgroundColor: 'white',
            width: this_width,
            height: this_height,
            pixelRatio: 1,
        });

        console.log(dataUrl.length);

        const dataUrl2 = htmlToImage.toJpeg(result_images, {
            backgroundColor: 'white',
            width: this_width,
            height: this_height,
            pixelRatio: 1,
        }).then((dataurl) => {

            console.log(dataurl.length);

            const filename = '2020mostlikedfeedimage.jpg';
            let byteString;
            if (dataurl.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataurl.split(',')[1]);
            else
                byteString = unescape(dataurl.split(',')[1]);
            const mimeString = dataurl.split(',')[0].split(':')[1].split(';')[0];
            const ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const downloadimg = new Blob([ia], {type: mimeString})
            const Register_FormData = new FormData();
            Register_FormData.append('downloadimg', downloadimg, filename);
            axios({
                method: 'post',
                url: `http://${location.hostname}/uploadimg`,
                data: Register_FormData,
                headers: {'Content-Type': 'multipart/form-data'},
                withCredentials: true,
            }).then((res) => {
                setIsdownload(false);
                setImgStck([]);
                if (res.data.success === true) {
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = `images/${filename}`;
                    link.click();
                }
            });
        });

    }

    return (<>
        <Header/>
        <Main>
            <div>
                2020 한 해 가장 좋아요를 많이 받은 게시물을 보여드립니다.
            </div>
            <Search>
                <div>아이디를 입력하세요.</div>
                <div>
                    <div>
                        <input type={'text'} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <div>
                            <Viewicon/>
                        </div>
                        <select onChange={(e) => setrowcols(e.target.value)}>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div onClick={(e) => {
                        getdata()
                    }}>
                        <Searchicon/>
                    </div>
                </div>
            </Search>
        </Main>
        {isLoading && <Loading>
            <img src='./src/loading.gif' alt='loading'/>
            <div>mostlikedfeed는 타인의 게시물을 무단으로 게시하는 행위에 대한 책임을 일절 지지 않습니다.</div>
        </Loading>}
        <ImageBoard height={Data.length}>
            <div id="result_images">
                {
                    Data.map((data, index) => {
                        return (<div key={index}>
                            <img height='100%' width='100%' src={data.node.display_url} alt='image'/>
                            <Like>
                                <div>
                                    <Heart/>
                                </div>
                                <div>
                                    {data.node.edge_media_preview_like.count}
                                </div>
                            </Like>
                        </div>);
                    })
                }
            </div>
            <DownShare>
                {
                    (Data.length > 0) && <>
                        <button onClick={(e) => {
                            if (isDownload === false) {
                                setIsdownload(true);
                            }
                        }
                        }>
                            <ImgdownIcon />
                        </button>
                        <button onClick={() => ShareKakao()}>
                            <ShareIcon />
                            <KakaoIcon />
                        </button>
                    </>
                }
            </DownShare>
        </ImageBoard>
        {
            isDownload === true && <div id="downaloadImage" style={{
                "display": "inline-block",
                "width": `calc(480px * ${Math.sqrt(Data.length)})`
            }}>
                {
                    Data.map((data, index) => {
                        return (<div key={index} style={{
                            "display": "inline-block",
                            "width": `calc(100% / ${Math.sqrt(Data.length)})`,
                            "height": `calc(100% / ${Math.sqrt(Data.length)})`,
                            "boxSizing": "border-box",
                            "padding": "1%",
                        }}>
                            <img style={{"borderRadius": "5%"}} height='100%' width='100%' src={data.node.display_url}
                                 onLoad={() => onloadImgStck(index)} alt='image'/>
                        </div>);
                    })
                }
            </div>
        }
        <Footer/>
    </>);
}

export default App;
