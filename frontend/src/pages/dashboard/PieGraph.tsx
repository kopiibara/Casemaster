import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack } from "@mui/material";

interface PieGraphProps {
  data: { id: number; value: number; label: string; color: string }[];
}

const PieGraph: React.FC<PieGraphProps> = ({ data }) => {
  return (
    <Stack direction="row" className="flex items-center">
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
        width={450}
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
            <span>{item.label}</span>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default PieGraph;
