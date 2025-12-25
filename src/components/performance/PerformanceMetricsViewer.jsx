"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import performanceMonitor from "utils/performanceMonitor";

export default function PerformanceMetricsViewer() {
  const [metrics, setMetrics] = useState([]);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const loadMetrics = () => {
    if (typeof window !== 'undefined' && window.__performanceMetrics) {
      setMetrics([...window.__performanceMetrics]);
      setFilteredMetrics([...window.__performanceMetrics]);
    } else {
      setMetrics([]);
      setFilteredMetrics([]);
    }
  };

  useEffect(() => {
    loadMetrics();
    
    // Listen for new metrics
    const handleNewMetric = () => {
      loadMetrics();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('performance-metric', handleNewMetric);
      return () => {
        window.removeEventListener('performance-metric', handleNewMetric);
      };
    }
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredMetrics(metrics);
    } else {
      setFilteredMetrics(metrics.filter((m) => m.eventType === filterType));
    }
  }, [filterType, metrics]);

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredMetrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `performance-metrics-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    performanceMonitor.clear();
    loadMetrics();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "cancelled":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getSummaryStats = () => {
    if (filteredMetrics.length === 0) return null;

    const categoryNav = filteredMetrics.filter((m) => m.eventType === "category-navigation");
    const addToCart = filteredMetrics.filter((m) => m.eventType === "add-to-cart-login-redirect");
    const appLoad = filteredMetrics.filter((m) => m.eventType === "app-load");

    const avgDuration = (type) => {
      const items = filteredMetrics.filter((m) => m.eventType === type);
      if (items.length === 0) return 0;
      return items.reduce((sum, m) => sum + m.duration, 0) / items.length;
    };

    return {
      total: filteredMetrics.length,
      categoryNav: {
        count: categoryNav.length,
        avgDuration: avgDuration("category-navigation"),
      },
      addToCart: {
        count: addToCart.length,
        avgDuration: avgDuration("add-to-cart-login-redirect"),
      },
      appLoad: {
        count: appLoad.length,
        avgDuration: avgDuration("app-load"),
      },
    };
  };

  const stats = getSummaryStats();

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Performance Metrics Viewer
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadMetrics}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={filteredMetrics.length === 0}
          >
            Export JSON
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            disabled={metrics.length === 0}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {stats && (
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Metrics
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Category Navigation
              </Typography>
              <Typography variant="h6">{stats.categoryNav.count} events</Typography>
              <Typography variant="body2" color="text.secondary">
                Avg: {formatDuration(stats.categoryNav.avgDuration)}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Add to Cart (Guest)
              </Typography>
              <Typography variant="h6">{stats.addToCart.count} events</Typography>
              <Typography variant="body2" color="text.secondary">
                Avg: {formatDuration(stats.addToCart.avgDuration)}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                App Load
              </Typography>
              <Typography variant="h6">{stats.appLoad.count} events</Typography>
              <Typography variant="body2" color="text.secondary">
                Avg: {formatDuration(stats.appLoad.avgDuration)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={filterType}
            label="Filter by Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="category-navigation">Category Navigation</MenuItem>
            <MenuItem value="add-to-cart-login-redirect">Add to Cart (Guest)</MenuItem>
            <MenuItem value="app-load">App Load</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredMetrics.length} of {metrics.length} metrics
        </Typography>
      </Box>

      {filteredMetrics.length === 0 ? (
        <Card>
          <CardContent>
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
              No performance metrics recorded yet. Start using the app to generate metrics.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMetrics
                .sort((a, b) => b.startTime - a.startTime)
                .map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {metric.eventType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={metric.status}
                        color={getStatusColor(metric.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {formatDuration(metric.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(metric.startTime).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Accordion
                        expanded={expanded === index}
                        onChange={() => setExpanded(expanded === index ? null : index)}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="body2">
                            {metric.milestones?.length || 0} milestones
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Metadata:
                            </Typography>
                            <Box
                              component="pre"
                              sx={{
                                bgcolor: "grey.100",
                                p: 1,
                                borderRadius: 1,
                                fontSize: "0.75rem",
                                overflow: "auto",
                              }}
                            >
                              {JSON.stringify(metric.metadata, null, 2)}
                            </Box>
                          </Box>
                          {metric.milestones && metric.milestones.length > 0 && (
                            <Box>
                              <Typography variant="subtitle2" gutterBottom>
                                Milestones:
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Elapsed</TableCell>
                                    <TableCell>Data</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {metric.milestones.map((milestone, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>
                                        <Chip
                                          label={milestone.name}
                                          size="small"
                                          variant="outlined"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {formatDuration(milestone.elapsed)}
                                      </TableCell>
                                      <TableCell>
                                        <Box
                                          component="pre"
                                          sx={{
                                            fontSize: "0.7rem",
                                            maxWidth: 300,
                                            overflow: "auto",
                                          }}
                                        >
                                          {JSON.stringify(milestone.data, null, 2)}
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

