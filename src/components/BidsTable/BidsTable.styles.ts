import { css } from '@emotion/core'

export const containerStyles = css`
    display: flex;
    flex-direction: column;
`

export const headerStyles = css`
    width: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2fr 1fr 1fr 1fr;

    background: rgb(230, 230, 230);
    font-weight: bold;

    & > span {
        padding: 10px;
    }

    user-select: none;
    cursor: pointer;
`

export const contentStyles = css`
    width: 100%;
`

export const rowStyles = css`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2fr 1fr 1fr 1fr;

    & > span {
        padding: 10px;
    }
`

export const addRowStyles = css`
    padding: 10px;
`
