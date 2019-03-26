import * as React from "react"
import { useCallback, useEffect, useRef } from "react"
import { useSunbeam } from "react-sunbeam"

interface Props {
    children: React.ReactNode
    color: string
    focused: boolean
    onFocus?: () => void
    onBlur?: () => void
    path: string[]
}

export function Box({ focused, color, children, onFocus, onBlur, path }: Props) {
    const { setFocus } = useSunbeam()
    const prevFocused = usePrevious(focused, focused)

    useEffect(() => {
        if (prevFocused === focused) return

        if (focused && onFocus) {
            onFocus()
            return
        }

        if (onBlur) {
            onBlur()
            return
        }
    }, [prevFocused, focused, onFocus, onBlur])

    const onClick = useCallback(() => {
        setFocus(path)
    }, [path])

    return (
        <div
            style={{
                padding: "10px",
                border: focused ? "1px solid black" : "1px solid transparent",
                borderRadius: "3px",
                backgroundColor: color,
                color: "white",
                fontFamily: "sans-serif",
                transform: focused ? "scale(1.2)" : "scale(1)",
                transition: "transform 100ms ease-in-out",
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

function usePrevious<T, I>(value: T, initialValue?: I): T | I {
    const ref = useRef<T | I>(initialValue)

    // Store current value in ref
    useEffect(() => {
        ref.current = value
    }, [value])

    // Return previous value (happens before update in useEffect above)
    return ref.current
}