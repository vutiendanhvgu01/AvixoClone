import HeaderFooterForm from 'modules/setting/components/HeaderFooter/header-footer-form';
import { handle } from 'next-runtime';
import { AvixoListLayout } from 'share-components';

const HeaderFooterSettingPage: React.FC = () => (
  <AvixoListLayout title="Header & Footer">
    <HeaderFooterForm />
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get() {
    return {
      props: {},
    };
  },
});

export default HeaderFooterSettingPage;
