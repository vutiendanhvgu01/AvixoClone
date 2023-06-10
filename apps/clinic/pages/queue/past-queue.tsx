import QueueLayout from 'modules/queue/components/QueueLayout/queue-layout';
import { GetServerSideProps } from 'next';

const QueuePage: React.FC = () => <QueueLayout title="Past Queue">{/**/}</QueueLayout>;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});

export default QueuePage;
