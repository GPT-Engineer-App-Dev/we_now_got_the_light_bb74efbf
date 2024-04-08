import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data, color }) => {
  const chartContainerRef = useRef();
  const chart = useRef();

  useEffect(() => {
    if (chart.current === undefined) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          backgroundColor: "#FFFFFF",
          textColor: "rgba(33, 56, 77, 1)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.7)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.7)",
          },
        },
        crosshair: {
          mode: createChart.CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "rgba(197, 203, 206, 1)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 1)",
        },
      });

      const lineSeries = chart.current.addLineSeries({
        color: color,
        lineWidth: 2,
      });

      if (data && data.length > 0) {
        const lineSeriesData = data.map((dataPoint) => ({
          time: Math.floor(new Date(dataPoint.time).getTime() / 1000),
          value: parseFloat(dataPoint.priceUsd),
        }));

        lineSeries.setData(lineSeriesData);
      }
    } else if (data && data.length > 0) {
      const lineSeriesData = data.map((dataPoint) => ({
        time: Math.floor(new Date(dataPoint.time).getTime() / 1000),
        value: parseFloat(dataPoint.priceUsd),
      }));

      chart.current.series().setData(lineSeriesData);
    }
  }, [data, color]);

  return <Box ref={chartContainerRef} />;
};

export default CryptoChart;
