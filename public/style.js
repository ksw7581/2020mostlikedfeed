import styled from 'styled-components';
import media from "styled-media-query";
import {HeartFill} from '@styled-icons/bootstrap/HeartFill';
import {SearchAlt} from '@styled-icons/boxicons-regular/SearchAlt';
import {ViewTile} from '@styled-icons/zondicons/ViewTile';
import {Download} from '@styled-icons/typicons/Download';
import {Share} from '@styled-icons/material-sharp/Share';
import {KakaoTalk} from '@styled-icons/remix-fill/KakaoTalk';
import {Whatsapp} from '@styled-icons/boxicons-logos/Whatsapp';
import {Instagram} from '@styled-icons/boxicons-logos/Instagram';

export const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: #00a8ff;
  line-height: 80px;
  color: white;
  font-weight: 800;
  font-size: 24px;
  text-align: center;
  position: relative;

  ${this} > div {
    margin: auto;
    width: 240px;
    height: 40px;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 120px);
  }
`;

export const ImageBoard = styled.div`
  width: 80%;
  margin: 10px 10%;
  height: ${props => props.height === 0 ? '400px' : 'auto'};
  padding-bottom: 100px;
  display: block;

  ${this} > div {

    ${this} > div {
      width: ${props => {
        if (props.height === 9) {
          return `33%`;
        } else if (props.height === 16) {
          return `25%`;
        } else if (props.height === 25) {
          return `20%`;
        }
      }};
      padding: 3px;
      box-sizing: border-box;
      display: inline-block;
      position: relative;

      &:hover {
        ${this} > div {
          opacity: 1;
        }

        ${this} > img {
          filter: blur(3px);
        }
      }

      ${this} > img {
        border-radius: 10px;
      }
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #00a8ff;
  padding: 10px 30px;
  height: 120px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;

  ${this} > div {
    width: 400px;
    display: flex;
    margin: auto;

    ${this} > div:nth-child(2) {
      box-sizing: border-box;
      padding: 10px 0;

      ${this} > div:nth-child(2) {
        display: flex;

        ${this} > a {
          margin-left: 4px;
          text-decoration: none;
          color: white;
          display: flex;
          font-weight: bold;
          height: 20px;

          ${this} > svg {
            width: 20px;
          }
        }
      }
    }
  }

`;

export const Search = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 90%;
  line-height: 10px;
  margin: 20px 5%;

  ${this} > div {
    display: flex;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;

    ${this} > div {
      margin: 0 5px;
    }

    ${this} > div:nth-child(1) {
      width: 60%;
      line-height: 12px;

      ${this} > input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #d1ccc0;
        border-radius: 3px;
        text-align: center;
      }
    }

    ${this} > div:nth-child(2) {
      width: calc(40% - 30px);
      border-radius: 3px;
      display: flex;

      ${this} > div {
        height: 30px;
        width: 30px;
        max-width: 36px;
        line-height: 24px;
        background-color: #63cdda;
        
        ${this} > svg {
          margin-left: 3px;
          width: 24px;
          height: 24px;
        }
      }

      ${this} > select {
        height: 100%;
        border: 1px solid #d1ccc0;
        border-radius: 2px;
        text-align: center;
        width: calc(100% - 30px);
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url("data:image/svg+xml;utf8,<svg fill='skyblue' viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/></g></svg>") no-repeat;
        background-position: right 5px top 50%;
      }
    }

    ${this} > div:nth-child(3) {
      height: 30px;
      line-height: 12px;
      max-width: 30px;
      cursor: pointer;
      border-radius: 3px;
      background-color: #63cdda;
    }
  }

  ${this} > input {
    border: 1px solid black;
  }
`;

export const Like = styled.div`
  width: 60px;
  height: 20px;
  color: white;
  font-weight: 800;
  text-align: center;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 30px);
  display: flex;
  opacity: 0;
  transition: all .3s ease 0s;

  ${this} > div {
    width: 100%;
    line-height: 30px;
  }
`;

export const Loading = styled.div`
  position: relative;
  width: 50%;
  display: block;
  margin: auto;

  ${this} > div {
    width: 100%;
    top: 250px;
    position: absolute;
    text-align: center;
  }

  ${this} > img {
    position: absolute;
    top: 150px;
    left: calc(50% - 32px);
  }
`
export const DownShare = styled.div`
  width: 260px;
  margin: 20px auto;
  display: flex;

  ${this} > button {
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    font-weight: 700;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 5px;
    display: flex;
    background-color: #63cdda;

    &:hover {
      background-color: #00a8ff;
    }
  }
`;

export const Heart = styled(HeartFill)`
  color: white;
  width: 100%;
  height: 100%;
`

export const Searchicon = styled(SearchAlt)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const Viewicon = styled(ViewTile)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const Main = styled.div`
  margin: 20px 10px;
  width: calc(100% - 20px);

  ${this} > div:nth-child(1) {
    font-size: 14px;
    text-align: center;
  }
`;

export const ImgdownIcon = styled(Download)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const ShareIcon = styled(Share)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const KakaoIcon = styled(KakaoTalk)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const WhatsappIcon = styled(Whatsapp)`
  color: white;
  width: 100%;
  height: 100%;
`;

export const InstaIcon = styled(Instagram)`
  color: white;
  width: 100%;
  height: 100%;
`;
