import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

#root {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}

.ant-modal {
  &-body {
    display: flex;   
    background: #dfe3e6!important;
    padding-top: 0!important;
  }
  &-header {
    display: flex;
    background: #dfe3e6!important;
    border-bottom: none!important;
  }
  &-title {
    width: 100%;
  }

  .card-label {
    &-green {
      background: #519839;
    }
    &-yellow {
      background: #d9b51c;
    }
    &-orange {
      background: #cd8313;
    }
    &-red {
      background: #b04632;
    }
    &-purple {
      background: #89609e;
    }
    &-blue {
      background: #0079bf;
    }
  }
}

`;
