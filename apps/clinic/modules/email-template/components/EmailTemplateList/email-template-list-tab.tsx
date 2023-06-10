import { Box } from '@mui/material';
import { EMAIL_TEMPLATE_TYPES } from 'modules/email-template/constants';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoTable } from 'share-components';
import { EMAIL_TEMPLATE_ACTION } from 'modules/setting/constants/email-template';
import { EmailTemplate, EmailTemplateType } from '../email-template-types';
import EmailTemplateTableColumns from './email-template-table-columns';

interface EmailTemplateListTabProps {
  emailTemplates: Pick<EmailTemplate, 'id' | 'name' | 'default' | 'status'>[];
}

const EmailTemplateListTab: React.FC<EmailTemplateListTabProps> = ({ emailTemplates }) => {
  const router = useRouter();
  const type = EMAIL_TEMPLATE_TYPES[router.query.tab as EmailTemplateType] as string | undefined;

  const onRowClick = useCallback((emailTemplate: EmailTemplate) => {
    console.log(emailTemplate);
  }, []);

  const onDelete = useCallback(
    async (id: number) => {
      await router.push({
        pathname: router.pathname,
        query: { ...router.query, action: EMAIL_TEMPLATE_ACTION.DELETE_TEMPLATE, id },
      });
    },
    [router],
  );

  return (
    <Box py={1}>
      <Box mx={-3} mt={-2}>
        <AvixoTable
          columns={EmailTemplateTableColumns({ onDelete })}
          onRowClick={onRowClick}
          data={{ records: emailTemplates }}
          primaryKey="id"
          emptyText={`No ${type?.toLowerCase()} email template has been created.`}
          mode="offline"
          hasCheckBoxHeader={false}
        />
      </Box>
    </Box>
  );
};

export default EmailTemplateListTab;
