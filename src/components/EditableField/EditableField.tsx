import { css, jsx } from '@emotion/core'
import { PureComponent, ChangeEvent, KeyboardEvent, createRef } from 'react'

type EditableFieldProps = {
    value: string
    onChange: (value: string) => void
    disabled: boolean
}

type EditableFieldState = {
    editing: boolean
    value: string
}

export class EditableField extends PureComponent<EditableFieldProps, EditableFieldState> {
    state: EditableFieldState = {
        editing: false,
        value: this.props.value,
    }

    inputRef = createRef<HTMLInputElement>()

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.currentTarget.value,
        })
    }

    handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 && !this.props.disabled) {
            this.handleBlur()

            return this.onChange(this.state.value)
        }

        if (event.keyCode === 27) {
            return this.handleBlur()
        }
    }

    handleClick = () => {
        if (this.props.disabled) {
            return
        }

        this.setState(
            {
                editing: true,
                value: this.props.value,
            },
            () => {
                this.inputRef.current.focus()
            },
        )
    }

    handleBlur = () => {
        this.setState({
            editing: false,
            value: '',
        })

        return this.onChange(this.state.value)
    }

    onChange = (value: string) => {
        if (this.props.value !== value) {
            this.props.onChange(value)
        }
    }

    render(): JSX.Element {
        if (this.state.editing) {
            return (
                <input
                    ref={this.inputRef}
                    type="text"
                    value={this.state.value}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onKeyUp={this.handleInput}
                    css={css`
                        width: 90%;
                        font-family: monospace;
                        padding: 5px;
                        border: 0;
                        font-size: inherit;
                        background: rgba(230, 230, 230, 1);
                    `}
                />
            )
        }

        return (
            <span
                onClick={this.handleClick}
                css={css`
                    display: inline-block;
                    padding: 5px;
                `}
                style={{ cursor: this.props.disabled ? 'initial' : 'pointer' }}
            >
                {this.props.value} <small>{!this.props.disabled ? '(edit)' : ' '}</small>
            </span>
        )
    }
}
