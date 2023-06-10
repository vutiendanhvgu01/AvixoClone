import { GetServerSideProps } from 'next';

interface AppointmentListPrintPageProps {
  appointments: [];
}

const AppointmentListPrintPage: React.FC<AppointmentListPrintPageProps> = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  const pageProps = {} as AppointmentListPrintPageProps;

  return {
    props: {
      ...pageProps,
    },
  };
};

export default AppointmentListPrintPage;
