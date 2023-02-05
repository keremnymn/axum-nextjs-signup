import { EmotionCache } from '@emotion/cache';
import { AxiosInstance } from 'axios';
import { AppProps } from 'next/app';

export interface dialogContent {
    dialogOpen: boolean;
    title?: string;
    text?: string;
    notClosable?: boolean;
    defaultButton?: {
        buttonText: string;
        func?(): Promise<void>;
    };
    extraButton?: {
        func(): Promise<void>;
        buttonText: string;
    };
    navigate?: string;
}

export interface CustomProps extends AppProps {
    emotionCache?: EmotionCache;
};

export interface UpdatedProps extends CustomProps {
    dialog: dialogContent,
    setDialog: React.Dispatch<React.SetStateAction<dialogContent>>,
    axios: AxiosInstance,
    backDropOpen: boolean;
    setbackDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
}