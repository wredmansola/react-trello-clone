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

.ant-card {
  position: relative;
  margin-bottom: 5px;
}
.ant-card-body {
  padding: 10px;
}

.ant-card input {
  height: 20px;
}

.ant-card p {
  margin-bottom: 0;
}

.ant-modal-body {
  display: flex;
}

`;
