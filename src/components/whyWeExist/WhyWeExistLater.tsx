import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"; // Import the MUI play button icon
import Image from "next/image";

const WhyWeExistLater: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const videoUrl = "/test.mp4"; // Replace with your video URL
	const posterImageUrl = "/home-background.png"; // Replace with your poster image URL

	return (
		<section id="why-we-exist" style={{ minHeight: "100vh" }}>
			<div style={{ position: "relative", textAlign: "center" }}>
				<video
					ref={videoRef}
					src={videoUrl}
					poster={posterImageUrl}
					controls={false}
					onClick={togglePlay}
                    style={{ width: "100%", height: "100%" }}
				></video>
				{!isPlaying && (
					<button
						onClick={togglePlay}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							background: "none",
							border: "none",
							fontSize: "2rem",
							color: "white",
							cursor: "pointer",
						}}
					>
						<Box mb={2} textAlign="center">
							<Typography
								variant="h5"
								sx={{ fontWeight: "bold" }}
								gutterBottom
							>
								WHY
							</Typography>
							<Typography
								variant="h4"
								sx={{ fontWeight: "bold" }}
								color="primary"
								gutterBottom
							>
								WE EXIST
							</Typography>
						</Box>
						<PlayCircleOutlineIcon fontSize="large" />
					</button>
				)}
			</div>
		</section>
	);
};

export default WhyWeExistLater;
