import { css } from '@emotion/core'

export const containerStyles = css`
    display: flex;
    flex-direction: column;

    padding: 10px;
`

export const rowStyles = css`
    width: 80%;
    display: flex;

    padding: 5px 0;

    & input {
        width: 500px;
        font-family: monospace;
    }
`

export const spacerStyles = css`
    flex-grow: 1;
`
