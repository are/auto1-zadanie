import { css } from '@emotion/core'

export const containerStyles = css`
    margin: 10px;
`

export const addMerchantStyles = css`
    margin-bottom: 10px;
`

export const listElementStyles = css`
    display: flex;
    width: 100%;

    padding: 10px;

    align-items: center;

    border-bottom: 1px solid black;

    &:last-of-type {
        border-bottom: 0;
    }

    cursor: pointer;

    &:hover {
        background: rgba(245, 245, 245, 1);
    }
`

export const avatarStyles = css`
    border-radius: 100%;
    width: 30px;
    height: 30px;

    margin-right: 10px;
`

export const spacerStyles = css`
    flex-grow: 1;
`

export const premiumLabelStyles = css`
    font-weight: bold;
    color: green;

    padding-right: 30px;
`
