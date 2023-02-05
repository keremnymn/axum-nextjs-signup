import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';

import AgreeDialog from "../components/basicDialog";
import { dialogContent, UpdatedProps, CustomProps } from '../src/types';
import axios from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress } from '@mui/material';
import theme from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const { publicRuntimeConfig } = getConfig();

function Verhaler(props: CustomProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [dialog, setDialog] = React.useState<dialogContent>({
    dialogOpen: false,
  });
  const [backDropOpen, setbackDropOpen] = React.useState(false);

  const axiosInstance = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
  });

  const updatedProps: UpdatedProps = {
    ...pageProps,
    dialog,
    setDialog,
    backDropOpen,
    setbackDropOpen,
    axios: axiosInstance,
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AgreeDialog message={dialog} setDialog={setDialog} />
        <Component {...updatedProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Verhaler;