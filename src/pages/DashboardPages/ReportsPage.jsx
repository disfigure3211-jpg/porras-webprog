import { useMemo, useRef } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, PieChart } from '@mui/x-charts';
import { reportBarData, reportPieData } from './dashboardData';

const reportTableColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'metric', headerName: 'Metric', flex: 1, minWidth: 150 },
  { field: 'target', headerName: 'Target', width: 120 },
  { field: 'actual', headerName: 'Actual', width: 120 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const reportTableRows = [
  { id: 1, metric: 'Monthly Output', target: '45 units', actual: '42 units', status: 'On track' },
  { id: 2, metric: 'Category Coverage', target: '80%', actual: '76%', status: 'Stable' },
  { id: 3, metric: 'Completion Ratio', target: '90%', actual: '84%', status: 'Improving' },
  { id: 4, metric: 'Quality Score', target: '8.5/10', actual: '8.2/10', status: 'Healthy' },
];

const ReportsPage = () => {
  const printRef = useRef(null);
  const timestamp = useMemo(
    () => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
    []
  );

  const highestValue = Math.max(...reportBarData.flatMap((entry) => [entry.seriesA, entry.seriesB]));
  const gaugeValue = 84;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const styles = `
      @page { size: A4 portrait; margin: 20mm; }
      body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #ffffff; color: #0f172a; }
      * { box-sizing: border-box; }
      .report-shell { width: 100%; max-width: 100%; margin: 0 auto; padding: 20px; }
      .print-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
      .print-header h1 { margin: 0; font-size: 32px; }
      .print-header p { margin: 4px 0 0; color: #475569; font-size: 14px; }
      .print-meta { color: #64748b; font-size: 12px; }
      .print-content > * { background: #ffffff !important; border: none !important; box-shadow: none !important; }
      .print-card { page-break-inside: avoid; margin-bottom: 18px; }
      .MuiDataGrid-root { border: 1px solid #e2e8f0 !important; }
      .MuiDataGrid-cell, .MuiDataGrid-columnHeaders { border-bottom: 1px solid #e2e8f0 !important; }
      svg { max-width: 100% !important; height: auto !important; }
      .no-print { display: none !important; }
    `;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Reports Summary</title>
          <style>${styles}</style>
        </head>
        <body>
          <div class="report-shell">
            <div class="print-header">
              <div>
                <h1>Reports Summary</h1>
                <p class="print-meta">Generated ${timestamp}</p>
              </div>
              <div>
                <p>Company Dashboard</p>
                <p class="print-meta">Printable report export</p>
              </div>
            </div>
            <div class="print-content">${printRef.current.outerHTML}</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const barSeries = useMemo(
    () => [
      {
        type: 'bar',
        id: 'generated',
        label: 'Generated',
        data: reportBarData.map((item) => item.seriesA),
        xAxisKey: 'x',
        yAxisKey: 'y',
        color: '#06b6d4',
      },
      {
        type: 'bar',
        id: 'completed',
        label: 'Completed',
        data: reportBarData.map((item) => item.seriesB),
        xAxisKey: 'x',
        yAxisKey: 'y',
        color: '#2563eb',
      },
    ],
    []
  );

  const gaugeSeries = useMemo(
    () => [
      {
        type: 'pie',
        id: 'completion-gauge',
        data: [
          { id: 'complete', value: gaugeValue, label: 'Completed' },
          { id: 'remaining', value: 100 - gaugeValue, label: 'Remaining' },
        ],
        innerRadius: '70%',
        outerRadius: '100%',
        startAngle: 180,
        endAngle: 0,
        cornerRadius: 8,
        arcLabel: (item) => (item.data.id === 'complete' ? `${item.data.value}%` : ''),
        arcLabelMinAngle: 1,
      },
    ],
    [gaugeValue]
  );

  return (
    <Box className="space-y-6 animate-fade-in" sx={{ p: 0 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Reports Dashboard
        </Typography>
        <Typography color="text.secondary">Track output, category share, completion progress, and printable summaries.</Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" className="no-print">
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography color="text.secondary">Compare generated and completed work across quarterly periods.</Typography>
          </CardContent>
        </Card>
        <Button variant="contained" color="info" onClick={handlePrint} sx={{ height: 48, alignSelf: 'center' }}>
          Export to Print
        </Button>
      </Stack>

      <Box ref={printRef} sx={{ '& .MuiPaper-root': { boxShadow: 'none !important' } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Monthly Report Output
                </Typography>
                <BarChart
                  width={680}
                  height={320}
                  series={barSeries}
                  xAxis={[{ id: 'x', data: reportBarData.map((item) => item.quarter), scaleType: 'point', position: 'bottom' }]}
                  yAxis={[{ id: 'y', position: 'left', label: 'Units' }]}
                  tooltip={{ visible: true }}
                  legend={{ position: 'bottom' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Completion Rate
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PieChart
                    width={300}
                    height={260}
                    series={gaugeSeries}
                    tooltip={{ visible: true }}
                    legend={{ position: 'bottom' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  Completion score for current reporting period.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Report Category Share
                </Typography>
                <PieChart
                  width={360}
                  height={320}
                  series={[
                    {
                      type: 'pie',
                      id: 'share',
                      data: reportPieData.map((entry) => ({ id: entry.name, value: entry.value, label: entry.name })),
                      innerRadius: '40%',
                      arcLabel: 'label',
                      arcLabelMinAngle: 8,
                    },
                  ]}
                  tooltip={{ visible: true }}
                  legend={{ position: 'bottom' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Report Summary
                </Typography>
                <Stack spacing={2}>
                  {reportPieData.map((item) => (
                    <Paper key={item.name} variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography>{item.name}</Typography>
                        <Typography fontWeight={700}>{item.value} reports</Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Report Table
                </Typography>
                <Box sx={{ height: 380, width: '100%' }}>
                  <DataGrid
                    rows={reportTableRows}
                    columns={reportTableColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    sx={{ border: 0, '& .MuiDataGrid-cell': { borderBottom: '1px solid rgba(226,232,240,0.8)' } }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ReportsPage;
