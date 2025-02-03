// // src/components/ThemeProvider.tsx
// 'use client'

// import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
// import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { PaletteMode } from '@mui/material';

// interface ThemeContextType {
//   mode: PaletteMode;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//   mode: 'light',
//   toggleTheme: () => {},
// });

// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light' 
//       ? {
//           primary: {
//             main: '#4a148c',
//           },
//           background: {
//             default: '#f5f5f5',
//             paper: '#ffffff',
//           },
//         }
//       : {
//           primary: {
//             main: '#6a1b9a',
//           },
//           background: {
//             default: '#121212',
//             paper: '#1e1e1e',
//           },
//         }
//     ),
//   },
//   components: {
//     MuiBottomNavigation: {
//       styleOverrides: {
//         root: {
//           backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
//         },
//       },
//     },
//   },
// });

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [mode, setMode] = useState<PaletteMode>('light');

//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <MUIThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </MUIThemeProvider>
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);















'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2', // Blue for neutral tone in light mode
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000', // Ensures readability on light background
          },
        }
      : {
          primary: {
            main: '#90caf9', // Lighter blue for contrast in dark mode
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#e0e0e0', // Light text for dark mode
            secondary: '#ffffff', // Ensures readability
          },
          link: {
            main: '#FFEB3B', // Brighter yellow for links in dark mode
          },
        }),
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);