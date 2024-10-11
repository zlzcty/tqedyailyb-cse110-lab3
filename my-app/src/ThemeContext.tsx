import React, {
    ReactNode,
    useState,
    useEffect,
    createContext,
    useContext,
} from 'react';

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

const ThemeContext = createContext({
    theme: themes.light,
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(
            currentTheme === themes.light ? themes.dark : themes.light
        );
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <div
                style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export const ToggleThemeButton: React.FC = () => {
    const { toggleTheme } = useTheme();
    return <button onClick={toggleTheme}>Change theme</button>;
};
