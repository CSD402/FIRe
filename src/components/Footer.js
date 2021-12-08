import {API_DOMAIN} from '../constants';

import {memo} from 'react';
import {Twitter, GitHub, Instagram, Database, Mail, Send} from 'react-feather';
import {useTranslation} from 'react-i18next';

function Footer() {
  const {t} = useTranslation();

  return (
    <footer>
      <div className="link">
        <a
          href="https://github.com/CSD402"
          target="_blank"
          rel="noopener noreferrer"
        >
          FIRe
        </a>
      </div>

      {/* <h5>{t('We stand with everyone fighting on the frontlines')}</h5> */}

      <div className="links">
        <a
          href="https://github.com/CSD402/FIRe"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>

        <a
          className="api"
          href='https://fir-e-server.herokuapp.com/translate/time-series'
          target="_blank"
          rel="noopener noreferrer"
        >
          <Database />
        </a>

        {/* <a
          href="https://twitter.com/covid19indiaorg"
          target="_blank"
          rel="noopener noreferrer"
          className="twitter"
        >
          <Twitter />
        </a> */}

        {/* <a
          href="https://instagram.com/covid19indiaorg"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <Instagram />
        </a> */}

        <a
          href="mailto:ma715@snu.edu.in"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
      </div>
    </footer>
  );
}

export default memo(Footer);
