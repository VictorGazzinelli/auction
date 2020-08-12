import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    
    body {
        background: '#f5f5f5';
        font-size: 13px;
        color: "#333";
        height:100vh;
        width:100vw;
        overflow: hidden;
        transition: background 0.5s;
        display: flex;
    }

    #root{
        display: flex;
        flex: 1;
    }

    *::-webkit-scrollbar {
      width: 8px;
  }

  *::-webkit-scrollbar-track {
      -webkit-box-shadow: none;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.1);
    outline: 1px solid rgba(0,0,0,1);
    border-radius: 60px;
    }
`;
