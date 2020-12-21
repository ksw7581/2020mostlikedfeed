import React, {useState} from 'react';
import axios from 'axios';
import * as htmlToImage from 'html-to-image';

import Header from './header';
import Footer from './footer';
import {ImageBoard, Main, Search, Searchicon, Viewicon, Loading, DownShare, Like, Heart} from './style'

const App = () => {
    const [username, setUsername] = useState('');
    const [rowcols, setrowcols] = useState(3);
    const [isLoading, setLoading] = useState(false);
    const [Data, setData] = useState([]);

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

    const downloadImage = async () => {
        const result_images = document.querySelector("#result_images");
        const this_width = result_images.offsetWidth;
        const this_height = result_images.offsetHeight;
        console.log(this_width, this_height);

        const dataUrl = await htmlToImage.toPng(result_images, {
            backgroundColor: 'white',
            width: this_width,
            height: this_height,
            pixelRatio: 1,
        });

        const filename = '2020mostlikedfeedimage.png';
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length
        const u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        const downloadimg = new File([u8arr], filename, {type:mime});
        const Register_FormData = new FormData();
        Register_FormData.append('downloadimg', downloadimg);

        const uploadimg = await axios({
            method: 'post',
            url: `http://${location.hostname}/uploadimg`,
            data: Register_FormData,
            headers: {'Content-Type': 'multipart/form-data'},
            withCredentials: true,
        });

        if(uploadimg.data.success === true) {
            const link = document.createElement('a');
            link.download = filename;
            link.href = `images/${filename}`;
            link.click();
        }
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
        <Loading>
            {isLoading && <img src='./src/loading.gif' alt='loading'/>}
        </Loading>
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
                        <button onClick={(e) => downloadImage()}>이미지 저장
                        </button>
                        <button>카카오톡 공유하기</button>
                    </>
                }
            </DownShare>
        </ImageBoard>
        <Footer/>
    </>);
}

export default App;
