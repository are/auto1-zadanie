import { css, Global, jsx } from '@emotion/core'

const globalStyles = css`
    html, body, div {
        margin: 0;
        padding: 0;

        box-sizing: border-box;
    }

    body {
        font-family: monospace;
    }
`

export const App = () => {
    return <div>
        <Global styles={globalStyles} />
        
    </div>
}
