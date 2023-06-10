import { createSvgIcon } from '@mui/material/utils';

export const StartQueueIcon = createSvgIcon(
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.71901 2.12083L2.12109 6.71875"
      stroke="#10B981"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.12132 2.47634V6.71898H6.36396"
      stroke="#10B981"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  'start-queue-icon',
);

export const EndQueueIcon = createSvgIcon(
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.12083 6.71901L6.71875 2.12109"
      stroke="#D14343"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.71852 6.36351L6.71852 2.12087L2.47588 2.12087"
      stroke="#D14343"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>,
  'end-queue-icon',
);

export const ClockQueueIcon = createSvgIcon(
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.75 8.75C2.54368 8.75 0.75 6.95632 0.75 4.75C0.75 2.54368 2.54368 0.75 4.75 0.75C6.95632 0.75 8.75 2.54368 8.75 4.75C8.75 6.95632 6.95632 8.75 4.75 8.75ZM4.75 2.01316C3.24263 2.01316 2.01316 3.24263 2.01316 4.75C2.01316 6.25737 3.24263 7.48684 4.75 7.48684C6.25737 7.48684 7.48684 6.25737 7.48684 4.75C7.48684 3.24263 6.25737 2.01316 4.75 2.01316Z"
      fill="#6B7280"
    />
    <path
      d="M3.9075 6.22369C3.69697 6.22369 3.48643 6.11422 3.36854 5.92053C3.1917 5.61738 3.28434 5.23001 3.58749 5.05317L4.2275 4.6658C4.29487 4.62369 4.32855 4.55632 4.32855 4.48896V3.7058C4.32855 3.36053 4.61487 3.07422 4.96013 3.07422C5.30539 3.07422 5.59171 3.35211 5.59171 3.69738V4.48053C5.59171 4.99422 5.31381 5.48264 4.87591 5.74369L4.2275 6.13106C4.13487 6.19843 4.01697 6.22369 3.9075 6.22369Z"
      fill="#6B7280"
    />
  </svg>,
  'clock-queue-icon',
);
