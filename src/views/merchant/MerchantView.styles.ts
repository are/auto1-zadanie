import { css } from '@emotion/core'

export const containerStyles = css`
    padding: 10px;
`

export const headerStyles = css`
    display: flex;
    align-items: center;
    justify-content: left;

    & > img {
        border-radius: 100%;
        width: 50px;
        height: 50px;

        margin-right: 15px;
    }

    & > h3 {
        font-size: 22px;
    }
`
