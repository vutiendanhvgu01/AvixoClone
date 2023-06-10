import QueueLayout from 'modules/queue/components/QueueLayout/queue-layout';
import { GetServerSideProps } from 'next';

const PrintQueue: React.FC = () => <QueueLayout title="Print">{/**/}</QueueLayout>;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});

export default PrintQueue;
