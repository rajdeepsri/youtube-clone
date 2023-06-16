import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return "Loading...";
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
    >
      {videos.map((vid, idx) => (
        <Box key={idx}>
          {vid.id.videoId && <VideoCard video={vid} />}
          {vid.id.channelId && <ChannelCard channelDetail={vid} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
