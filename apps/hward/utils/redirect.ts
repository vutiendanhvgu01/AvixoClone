import { ServerResponse } from 'http';

function temporaryRedirect(res: ServerResponse, path: string) {
  if (res) {
    res.writeHead(307, { Location: path });
    res.end();
  }
}

// eslint-disable-next-line import/prefer-default-export
export { temporaryRedirect };
