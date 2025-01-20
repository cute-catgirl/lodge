const styleTag = document.getElementById("theme");
const themes = [
    "nord",
    "nord-dark",
    "catppuccin",
    "rose-pine",
    "gay",
    "terminal",
    "dark",
    "oldschool"
]

let theme = 0;
if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
}

theme = parseInt(theme);

function nextTheme() {
    theme += 1;
    if (theme >= themes.length) {
        theme = 0;
    }
    styleTag.href = `/themes/${themes[theme]}.css`;
    localStorage.setItem("theme", theme);
}

styleTag.href = `/themes/${themes[theme]}.css`;