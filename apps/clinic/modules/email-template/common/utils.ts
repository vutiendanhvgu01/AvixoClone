import { Recipient } from '../components/email-template-types';

/**
 * Formats given body recipient structure to match the API's recipient structure
 * From: `['email1 email2']`
 *
 * To: `[ { email: 'email1' }, { email: 'email2' } ]`
 * */
const formatRecipient = (recipients: string[]): Pick<Recipient, 'email'>[] | null =>
  recipients?.[0] === '' ? null : recipients[0].split(' ').map(re => ({ email: re }));

// eslint-disable-next-line import/prefer-default-export
export { formatRecipient };
