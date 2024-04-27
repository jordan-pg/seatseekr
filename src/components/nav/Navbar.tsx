/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, ThemeProvider, styled } from "@mui/material";
// import Image from "next/image";
import theme from "@/components/theme/theme";
import { Link } from "react-scroll";
import NavLink from "@mui/material/Link";
// import Searchbar from "@/components/searchbar/Searchbar";
// import { AccountCircle } from "@mui/icons-material";
// import MobileSearchbar from "../searchbar/MobileSearchbar";
import { usePathname } from "next/navigation";

const drawerWidth = 240;
const navItems = [
	{ label: "Popular Events", key: "popular-events" },
	{ label: "Why We Exist", key: "why-we-exist" },
	{ label: "Talk To Us", key: "leave-feedback" },
];

const StyledNavButton = styled(ListItemButton)(({ selected }) => ({
	position: "relative",
	height: "100%",
	paddingBottom: 3,
	maxWidth: "fit-content",
	"& .MuiTypography-root": {
		color: selected ? `${theme.palette.primary.main}` : "white",
		borderRadius: 12,
		fontWeight: 600,
	},
	"&::before": {
		content: '""',
		position: "absolute",
		left: 0,
		bottom: 0,
		width: 0,
		borderBottom: `2px solid ${theme.palette.primary.main}`,
		transition: "width 0.2s ease-out",
	},
	"&:hover::before": {
		width: "80%",
		margin: "auto",
		left: 0,
		right: 0,
	},
	"&:hover": {
		backgroundColor: "transparent",
		"& .MuiTypography-root": {
			color: `${theme.palette.primary.main}`,
		},
		cursor: "pointer",
	},
}));

const Navigation = () => {
	const pathName = usePathname();
	const [mounted, setMounted] = useState(false);
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll("section");
			let currentSection = "";

			sections.forEach((section) => {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.offsetHeight;

				if (
					window.scrollY >= sectionTop - 100 &&
					window.scrollY < sectionTop + sectionHeight - 100
				) {
					currentSection = section.id;
				}
			});

			setActiveSection(currentSection);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.pageYOffset;
			if (scrollPosition > 0 && !isScrolled) {
				setIsScrolled(true);
			} else if (scrollPosition === 0 && isScrolled) {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isScrolled]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				SeatSeekr
			</Typography>
			<Divider />
			<List sx={{ textAlign: "start", m: 2 }}>
				{navItems.map((item) => (
					<Link
						key={item.key}
						to={item.key}
						spy={true}
						smooth={true}
						duration={500}
						onClick={handleDrawerToggle}
					>
						<StyledNavButton
							key={item.key}
							selected={activeSection === item.key}
						>
							<Typography variant="subtitle1">
								{item.label}
							</Typography>
						</StyledNavButton>
					</Link>
				))}
				<Button
					sx={{ mt: 3 }}
					onClick={() =>
						window.open("https://forms.gle/sys3TubVTN4v8Qvi8")
					}
				>
					Get Updates
				</Button>
			</List>
		</Box>
	);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					component="nav"
					color="transparent"
					sx={{
						backgroundColor: isScrolled
							? "rgba(0,0,0, .85)"
							: "transparent",
						boxShadow: "none",
						transition: "background-color 0.3s ease-in-out",
					}}
				>
					<Toolbar
						sx={{
							justifyContent: "space-between",
							m: { xs: 1 },
						}}
					>
						<Box
							sx={{
								gap: 5,
								alignItems: "center",
								display: "flex",
							}}
						>
							<NavLink href="/">
								<img
									src="/newlogo.png"
									alt="logo"
									width={180}
									height={30}
									style={{ cursor: "pointer" }}
								/>
							</NavLink>
						</Box>
						<Box
							sx={{
								gap: 5,
								alignItems: "center",
								display: "flex",
							}}
						>
							{pathName !== "/search-event" && (
								<>
									{navItems.map((item) => (
										<Link
											key={item.key}
											to={item.key}
											spy={true}
											smooth={true}
											duration={500}
											offset={-100}
										>
											<StyledNavButton
												key={item.key}
												sx={{
													display: {
														xs: "none",
														sm: "none",
														md: "none",
														lg: "flex",
													},
												}}
												selected={
													activeSection === item.key
												}
											>
												<Typography variant="subtitle1">
													{item.label}
												</Typography>
											</StyledNavButton>
										</Link>
									))}
									<Button
										sx={{
											display: {
												xs: "none",
												sm: "none",
												md: "none",
												lg: "flex",
											},
										}}
										onClick={() =>
											window.open(
												"https://forms.gle/sys3TubVTN4v8Qvi8"
											)
										}
									>
										Get Updates
									</Button>
								</>
							)}
						</Box>
						{/* <Box display="inline-flex">
							<Box
								sx={{
									display: {
										xs: "none",
										sm: "none",
										md: "none",
										lg: "flex",
									},
								}}
							>
								{isScrolled && <Searchbar />}
							</Box>
							<MobileSearchbar />
							 */}
						{pathName !== "/search-event" && (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								sx={{ display: { lg: "none" } }}
							>
								<MenuIcon />
							</IconButton>
						)}
						{/* <IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							// aria-controls={menuId}
							aria-haspopup="true"
							// onClick={handleProfileMenuOpen}
							color="inherit"
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "none",
                                    lg: "flex",
                                },
                                '&:hover': {
                                    color: theme.palette.primary.main
                                }

                            }}
						>
							<AccountCircle />
						</IconButton> */}
						{/* </Box> */}
					</Toolbar>
				</AppBar>
				<Box component="nav">
					<Drawer
						variant="temporary"
						anchor="right"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default Navigation;
