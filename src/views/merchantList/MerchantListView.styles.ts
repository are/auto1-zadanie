import { css } from '@emotion/core'

export const listElementStyles = css`
    width: 100%;

    padding: 10px;

    border-bottom: 1px solid black;

    &:last-of-type {
        border-bottom: 0;
    }
`
