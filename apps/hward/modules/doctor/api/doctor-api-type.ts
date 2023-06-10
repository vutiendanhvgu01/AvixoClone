interface USMSBaseAccount {
  active: boolean;
  country: string;
  meta: {
    tag: string;
  };
  id: string;
}

interface USMSJarvisAccount extends USMSBaseAccount {
  type: 'jarvis';
}

interface USMSAvixoAccount extends USMSBaseAccount {
  type: 'avixo';
}

type Account = USMSJarvisAccount | USMSAvixoAccount;

export interface USMSDoctor {
  hward: {
    contacts: {
      emails: unknown[];
      phones: unknown[];
      addresses: unknown[];
    };
    createdAt: string;
    modifiedAt: string;
    _id: string;
    status: string;
    name: string;
    type: string;
    accounts: Account[];
  };
}
