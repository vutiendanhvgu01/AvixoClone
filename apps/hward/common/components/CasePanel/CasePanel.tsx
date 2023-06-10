import { PatientCasesResponse } from 'modules/cases/api/case-type';
import { CasesIcon } from 'share-components';
import ContentPanel from '../ContentPanel/content-panel';
import CaseList from './CaseList';

interface CasePanelProps {
  cases: PatientCasesResponse[];
}

const CasePanel: React.FC<CasePanelProps> = ({ cases }) => {
  const Body = <CaseList cases={cases} />;

  return (
    <ContentPanel title="Cases" Icon={CasesIcon}>
      {Body}
    </ContentPanel>
  );
};

export default CasePanel;
