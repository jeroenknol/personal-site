import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type State = 'dark' | 'light';

type API = {
  toggleTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
};

const ThemeContext = createContext<State>('dark');
const ThemeAPIContext = createContext<API>({} as API);

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<State>('dark');

  useEffect(() => {
    if (document) {
      const prefersDarkMode = localStorage.getItem('theme') === 'dark';
      if (prefersDarkMode) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

  const API = useMemo(
    () => ({
      toggleTheme: () => {
        setTheme((cur) => {
          if (cur === 'dark') {
            localStorage.setItem('theme', 'light');
            return 'light';
          } else {
            localStorage.setItem('theme', 'dark');
            return 'dark';
          }
        });
      },
      setDarkTheme: () => {
        setTheme('dark');
      },
      setLightTheme: () => {
        setTheme('light');
      },
    }),
    []
  );

  return (
    <ThemeAPIContext.Provider value={API}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeAPIContext.Provider>
  );
};

export const useTheme = (): State => useContext(ThemeContext);
export const useThemeAPI = (): API => useContext(ThemeAPIContext);
