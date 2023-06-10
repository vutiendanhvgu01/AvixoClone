import { SVGAttributes } from 'react';

const DischargedIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width={20} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M11.3368 10.9037L11.6904 10.5502L11.3368 10.1966L9.64515 8.50497C9.62363 8.48345 9.61035 8.45271 9.61035 8.41686C9.61035 8.38101 9.62363 8.35028 9.64515 8.32875C9.66668 8.30722 9.69742 8.29395 9.73327 8.29395C9.76912 8.29395 9.79985 8.30722 9.82138 8.32875L11.9547 10.4621C11.9762 10.4836 11.9895 10.5143 11.9895 10.5502C11.9895 10.586 11.9762 10.6168 11.9547 10.6383L9.82138 12.7716L9.81529 12.7777L9.80941 12.784C9.80613 12.7875 9.79905 12.7935 9.78513 12.7991C9.77053 12.8049 9.75219 12.8085 9.73327 12.8085C9.71559 12.8085 9.70006 12.8053 9.68674 12.7999C9.67388 12.7948 9.65984 12.7863 9.64515 12.7716C9.62363 12.7501 9.61035 12.7194 9.61035 12.6835C9.61035 12.6477 9.62363 12.6169 9.64516 12.5954L11.3368 10.9037Z"
      stroke="currentColor"
    />
    <path
      d="M11.8085 10.6748H3.3335C3.30335 10.6748 3.27207 10.6625 3.24642 10.6369C3.22078 10.6112 3.2085 10.58 3.2085 10.5498C3.2085 10.5197 3.22078 10.4884 3.24642 10.4627C3.27207 10.4371 3.30335 10.4248 3.3335 10.4248H11.8085C11.8386 10.4248 11.8699 10.4371 11.8956 10.4627C11.9212 10.4884 11.9335 10.5197 11.9335 10.5498C11.9335 10.58 11.9212 10.6112 11.8956 10.6369C11.8699 10.6625 11.8386 10.6748 11.8085 10.6748Z"
      stroke="currentColor"
    />
    <path
      d="M10 17.7918C9.65833 17.7918 9.375 17.5085 9.375 17.1668C9.375 16.8252 9.65833 16.5418 10 16.5418C13.5583 16.5418 16.0417 14.0585 16.0417 10.5002C16.0417 6.94183 13.5583 4.4585 10 4.4585C9.65833 4.4585 9.375 4.17516 9.375 3.8335C9.375 3.49183 9.65833 3.2085 10 3.2085C14.2917 3.2085 17.2917 6.2085 17.2917 10.5002C17.2917 14.7918 14.2917 17.7918 10 17.7918Z"
      fill="currentColor"
    />
  </svg>
);

export default DischargedIcon;