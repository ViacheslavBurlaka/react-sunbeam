import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { render } from "react-dom"
import { Focusable, SunbeamProvider, FocusManager, useSunbeam } from "react-sunbeam"

import { Box } from "./Box"
import { Menu } from "./Menu"
import { Grid } from "./Grid"

export function App() {
    const [selectedItem, setSelectedItem] = useState<string | null>(null)

    const { moveFocusLeft, moveFocusRight, moveFocusUp, moveFocusDown } = useSunbeam()
    const onKeyDown = useCallback(
        (event: Event) => {
            if (!(event instanceof KeyboardEvent)) return

            switch (event.key) {
                case "ArrowRight":
                    moveFocusRight()
                    return

                case "ArrowLeft":
                    moveFocusLeft()
                    return

                case "ArrowUp":
                    moveFocusUp()
                    return

                case "ArrowDown":
                    moveFocusDown()
                    return

                case " ":
                case "Enter":
                    alert(`Selected item: ${selectedItem}`)
                    return
            }
        },
        [focusManager, selectedItem]
    )

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)

        return () => document.removeEventListener("keydown", onKeyDown)
    }, [onKeyDown])

    return (
        <Focusable focusKey="app">
            {({ focused }) => (
                <div>
                    <div style={{ display: "flex" }}>
                        <Focusable focusKey="navigation">
                            {({ focused }) => (
                                <div style={{ display: "flex" }}>
                                    <Focusable focusKey="movies" style={{ margin: "20px" }}>
                                        {({ focused, path }) => (
                                            <Box
                                                focused={focused}
                                                onFocus={() => setSelectedItem(path.join("->"))}
                                                color="darkgray"
                                                path={path}
                                            >
                                                Movies
                                            </Box>
                                        )}
                                    </Focusable>
                                    <Focusable focusKey="series" style={{ margin: "20px" }}>
                                        {({ focused, path }) => (
                                            <Box
                                                focused={focused}
                                                onFocus={() => setSelectedItem(path.join("->"))}
                                                color="darkgray"
                                                path={path}
                                            >
                                                Series
                                            </Box>
                                        )}
                                    </Focusable>
                                    <Focusable focusKey="sports" style={{ margin: "20px" }}>
                                        {({ focused, path }) => (
                                            <Box
                                                focused={focused}
                                                onFocus={() => setSelectedItem(path.join("->"))}
                                                color="darkgray"
                                                path={path}
                                            >
                                                Sports
                                            </Box>
                                        )}
                                    </Focusable>
                                    <Focusable focusKey="kids" style={{ margin: "20px" }}>
                                        {({ focused, path }) => (
                                            <Box
                                                focused={focused}
                                                onFocus={() => setSelectedItem(path.join("->"))}
                                                color="darkgray"
                                                path={path}
                                            >
                                                Kids
                                            </Box>
                                        )}
                                    </Focusable>
                                </div>
                            )}
                        </Focusable>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Focusable focusKey="leftMenu">
                            {({ focused }) => (
                                <Menu
                                    size={5}
                                    onItemFocus={itemFocusPath => {
                                        setSelectedItem(itemFocusPath.join("->"))
                                    }}
                                />
                            )}
                        </Focusable>
                        <Focusable focusKey="grid">
                            {({ focused }) => (
                                <Grid
                                    size={30}
                                    onItemFocus={itemFocusPath => {
                                        setSelectedItem(itemFocusPath.join("->"))
                                    }}
                                />
                            )}
                        </Focusable>
                        <Focusable focusKey="rightMenu">
                            {({ focused }) => (
                                <Menu
                                    size={5}
                                    onItemFocus={itemFocusPath => {
                                        setSelectedItem(itemFocusPath.join("->"))
                                    }}
                                />
                            )}
                        </Focusable>
                    </div>
                </div>
            )}
        </Focusable>
    )
}

const focusManager = new FocusManager({
    initialFocusPath: [],
})

render(
    <SunbeamProvider focusManager={focusManager}>
        <App />
    </SunbeamProvider>,
    document.getElementById("app")
)