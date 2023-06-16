import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Stack, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import ReactPlayer from "react-player/youtube";
import { Collapse } from "@mui/material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snipppet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return "loading";
  const formatNumber = (likeCount) => {
    if (likeCount >= 1000000000) {
      return (likeCount / 1000000000).toFixed(2) + "B";
    } else if (likeCount >= 1000000) {
      return (likeCount / 1000000).toFixed(2) + "M";
    } else if (likeCount >= 1000) {
      return (likeCount / 1000).toFixed(1) + "K";
    } else {
      return likeCount.toString();
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleExpanded = () => setIsExpanded(!isExpanded);

  const {
    snippet: { title, channelId, channelTitle, description, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  const descriptionLines = description.split("\n");
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky" }}>
            <ReactPlayer
              playing={true}
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography
              color="#fff"
              variant="h5"
              fontWeight="500"
              fontFamily="poppins"
              letterSpacing="0"
              px={{ xs: "1rem", sm: "2rem" }}
              pb={1}
              pt={2}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {title || "a youtube video"}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              px={{ xs: "1rem", sm: "2rem" }}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  fontFamily="poppins"
                  variant={{ xs: "subtitle2", sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  sx={{ fontSize: { xs: "0.7rem", sm: "1.1rem" } }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                    color: "#fff",
                    fontSize: { xs: "0.7rem", sm: "1rem" },
                  }}
                >
                  {formatNumber(parseInt(viewCount))} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                    color: "#fff",
                    fontSize: { xs: "0.7rem", sm: "1rem" },
                  }}
                >
                  {formatNumber(parseInt(likeCount))} likes
                </Typography>
              </Stack>
            </Stack>
            <Collapse in="true" collapsedSize="11rem" sx={{}}>
              <Stack
                height={isExpanded ? "100%" : "10rem"}
                mx={{ xs: "1rem", sm: "2rem" }}
                px={{ xs: "0.5rem", sm: "1rem" }}
                my="2rem"
                py="1rem"
                sx={{
                  display: "block",
                  transition: "0.35s all ease-in-out",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.1);",
                  overflow: "hidden",
                }}
              >
                <Box
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography
                    fontSize="0.9rem"
                    fontFamily="poppins"
                    fontWeight="bold"
                    sx={{ color: "#fff" }}
                  >
                    Published on {formatDate(publishedAt)}
                  </Typography>
                  <Button
                    onClick={handleExpanded}
                    sx={{
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {isExpanded ? "show less" : "show more"}
                  </Button>
                </Box>
                <Box>
                  {descriptionLines.map((line, idx) => {
                    if (line === "") return <br key={idx} />;
                    return (
                      <Typography
                        fontSize="0.9rem"
                        lineHeight="1.3rem"
                        key={idx}
                        sx={{
                          color: "#fff",
                        }}
                      >
                        {line}
                      </Typography>
                    );
                  })}
                </Box>
              </Stack>
            </Collapse>
          </Box>
        </Box>
        <Box
          display="flex"
          px={2}
          py={{ md: 0, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          sx={{ ml: { sm: "0", md: "1rem" } }}
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
