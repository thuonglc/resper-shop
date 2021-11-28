import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppBugReports from './AppBugReports';
import AppItemOrders from './AppItemOrders';
import AppNewUsers from './AppNewUsers';
import AppWeeklySales from './AppWeeklySales';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Dashborad</title>
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />
        <AdminSidebar />
        <main className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
}
