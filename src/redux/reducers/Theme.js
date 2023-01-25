import {createSlice} from "@reduxjs/toolkit";
import {THEME_CONFIG} from "configs/AppConfig";
const slice = createSlice({
    name: "theme",
    initialState: {...THEME_CONFIG},
    reducers: {
        toggleCollapsedNav: (state, {payload}) => {
            state.navCollapsed = payload;
        },
        onNavStyleChange: (state, {payload}) => {
            state.sideNavTheme = payload;
        },
        onLocaleChange: (state, {payload}) => {
            state.locale = payload;
        },
        onNavTypeChange: (state, {payload}) => {
            state.navType = payload;
        },
        onTopNavColorChange: (state, {payload}) => {
            state.topNavColor = payload;
        },
        onHeaderNavColorChange: (state, {payload}) => {
            state.headerNavColor = payload;
        },
        onMobileNavToggle: (state, {payload}) => {
            state.mobileNav = payload;
        },
        onSwitchTheme: (state, {payload}) => {
            state.currentTheme = payload;
        },
        onDirectionChange: (state, {payload}) => {
            state.direction = payload;
        },
    },
});

export default slice.reducer;
export const {
    toggleCollapsedNav,
    onNavStyleChange,
    onLocaleChange,
    onNavTypeChange,
    onTopNavColorChange,
    onHeaderNavColorChange,
    onMobileNavToggle,
    onDirectionChange,
    onSwitchTheme,
} = slice.actions;
