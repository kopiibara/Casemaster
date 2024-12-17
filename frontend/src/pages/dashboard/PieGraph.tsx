import * as React from "react";
import { PieChart } from "@mui/x-charts";
import { Box, Stack, Button, Typography } from "@mui/material";

interface PieGraphProps {
  data: { id: number; value: number; label: string; color: string }[];
}

const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  return (
    <Stack className="flex items-start justify-start" spacing={2}>
      <PieChart
        className="relative"
        series={[
          {
            highlightScope: { fade: "global", highlight: "item" },
            faded: {
              innerRadius: 10,
              additionalRadius: -10,
              color: "gray",
            },
            data: data.map((item) => ({
              id: item.label,
              value: item.value,
              color: item.color, // Default color if not provided
            })),
          },
        ]}
        width={300}
        height={300}
      />
      {/* Manual legend rendering */}
      <Stack>
        {data.map((item) => (
          <Box key={item.id} className="flex items-center space-x-2">
            <Box
              style={{
                backgroundColor: item.color, // Default color if not provided
                width: 16,
                height: 16,
                borderRadius: "50%",
              }}
            ></Box>
            <Button
              variant="text"
              sx={{ textTransform: "none", width: "100%" }}
            >
              <Stack
                direction={"row"}
                spacing={4}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" className="text-[#0F2043]">
                  {item.label}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="text-[#0F2043] text-right"
                >
                  {item.value}
                </Typography>
              </Stack>
            </Button>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default PieGraph;
