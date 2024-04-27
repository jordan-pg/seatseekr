import { createTheme } from "@mui/material/styles";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"], display: 'swap' });

const theme = createTheme({
	palette: {
		primary: {
			main: "#98C1D9",
		},
		secondary: {
			main: "#a1cc3a",
		},
		background: {
			paper: "#293241",
			default: "#000000",
		},
		text: {
			primary: "#ffffff",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					color: "white",
					fontWeight: "bold",
					borderRadius: 24,
					backgroundColor: 'rgba(38, 192, 226, .6)',
					border: '1px solid rgba(38, 192, 226)',
					'&:hover': {
						background: "rgba(38, 192, 226)",
					 },
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					backdropFilter: 'blur(10px)',
					color: 'white',
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: 'white',
					fontFamily: inter.style.fontFamily
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					width: '100%',
					backgroundColor: 'white',
					color: 'black',
				}
			}
		},
	}
});

export default theme;
