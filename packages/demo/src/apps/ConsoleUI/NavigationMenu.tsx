import * as React from "react"
import { memo } from "react"
import { Focusable, FocusEvent } from "react-sunbeam"
import { FocusableItem } from "./FocusableItem"

type Props = {
    onFocus: (event: FocusEvent) => void
    onBlur: (event: FocusEvent) => void
    onItemFocus: (event: FocusEvent) => void
    onItemBlur: (event: FocusEvent) => void
}

export const NavigationMenu = memo(function NavigationMenu({ onFocus, onBlur, onItemFocus, onItemBlur }: Props) {
    return (
        <Focusable
            focusKey="navigationMenu"
            onFocus={onFocus}
            onBlur={onBlur}
            style={{ display: "flex", justifyContent: "center", width: "1078px" }}
        >
            <div style={{ marginRight: "8px" }}>
                <NavMenuItem focusKey="1" onFocus={onItemFocus} onBlur={onItemBlur} />
            </div>
            <div style={{ marginRight: "8px" }}>
                <NavMenuItem focusKey="2" onFocus={onItemFocus} onBlur={onItemBlur} />
            </div>
            <div style={{ marginRight: "8px" }}>
                <NavMenuItem focusKey="3" onFocus={onItemFocus} onBlur={onItemBlur} />
            </div>
            <div style={{ marginRight: "8px" }}>
                <NavMenuItem focusKey="4" onFocus={onItemFocus} onBlur={onItemBlur} />
            </div>
            <div style={{ marginRight: "8px" }}>
                <NavMenuItem focusKey="5" onFocus={onItemFocus} onBlur={onItemBlur} />
            </div>
            <NavMenuItem focusKey="6" onFocus={onItemFocus} onBlur={onItemBlur} />
        </Focusable>
    )
})

function NavMenuItem({
    focusKey,
    onFocus,
    onBlur,
}: {
    focusKey: string
    onFocus: (event: FocusEvent) => void
    onBlur: (event: FocusEvent) => void
}) {
    return (
        <FocusableItem
            focusKey={focusKey}
            style={focused => ({
                border: focused ? "4px solid cyan" : "4px solid transparent",
                borderRadius: "50%",
                transition: "border-color 100ms ease-out",
            })}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <div
                style={{
                    backgroundColor: "#505050",
                    boxSizing: "border-box",
                    border: "2px solid black",
                    borderRadius: "50%",
                    height: "92px",
                    width: "92px",
                }}
            />
        </FocusableItem>
    )
}
