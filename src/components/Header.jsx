const Header = () => {
    function toggleMode() {
        let darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        )
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = document.documentElement.classList.toggle('dark')

        if (isDarkMode === isSystemDarkMode) {
            delete window.localStorage.isDarkMode
        } else {
            window.localStorage.isDarkMode = isDarkMode
        }
    }

    return (
        <div className="flex w-full items-center justify-between py-4">
            <a
                href="/"
                className="text-xl font-bold tracking-tight transition-all duration-500 ease-in-out hover:-translate-y-1"
            >
                Marvin Messenzehl
            </a>
            <div className="flex flex-row space-x-4 rounded-md bg-neutral-50 p-4 dark:bg-neutral-900">
                <a className="font-medium transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-blue-500 dark:hover:text-orange-500">
                    About
                </a>
                <a className="font-medium transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-blue-500 dark:hover:text-orange-500">
                    Writing
                </a>
                <a className="font-medium transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-blue-500 dark:hover:text-orange-500">
                    Work
                </a>
            </div>
            <button
                onClick={toggleMode}
                className="rounded-md border border-neutral-100 bg-neutral-50 px-4 py-3 font-medium transition-all duration-300 ease-in-out hover:border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 hover:dark:border-neutral-700 hover:dark:bg-neutral-800"
            >
                Toggle Mode
            </button>
        </div>
    )
}

export default Header
