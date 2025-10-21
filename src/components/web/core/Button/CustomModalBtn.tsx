'use client'
import { CustomModalProps } from '@/types/module/themuiModule'
import { FC } from 'react'
import { Flex } from 'theme-ui'
import { ThemeButton } from './Button'

export const CustomModalBtn: FC<CustomModalProps> = ({
    wrapperClass,
    cancelBtnClassName = 'cta-button',
    submitBtnClassName = 'cta-button',
    cancelBtnVariant = 'quaternaryBtn',
    submitBtnVariant = 'primary',
    cancelBtnTitle,
    submitBtnTitle,
    cancelBtnDisabled = false,
    submitBtnDisabled = false,
    cancelBtnSx,
    submitBtnSx,
    wrapperSx,
    cancelBtnClick,
    submitBtnClick,
}) => {
    return (
        <Flex
            className={wrapperClass}
            sx={{ justifyContent: 'space-between', ...wrapperSx }}
        >
            {cancelBtnTitle && (
                <ThemeButton
                    className={cancelBtnClassName}
                    variant={cancelBtnVariant}
                    text={cancelBtnTitle}
                    disabled={cancelBtnDisabled}
                    sx={cancelBtnSx}
                    onClick={cancelBtnClick}
                />
            )}

            <ThemeButton
                className={submitBtnClassName}
                text={submitBtnTitle}
                disabled={submitBtnDisabled}
                onClick={submitBtnClick}
                variant={submitBtnVariant}
                sx={submitBtnSx}
                type="submit"
            />
        </Flex>
    )
}
