import express, { Request, Response } from 'express';
import axios from 'axios';
import { check, validationResult } from 'express-validator';

import { resolveCname } from '../utils/resolveCname';

const router = express.Router()

const validator = [
  check('domains').isArray().withMessage('Domains must be an array'),
  check('domains.*').isString().withMessage('Each domain must be a string')
];

interface IPages {
  search: string;
  loginPage: string[];
  supportPage: string[];
}

router.post('/pages', validator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const domains: string[] = req.body.domains

  const list = await Promise.all(domains.map(async (domain) => {
    const company = domain.split('.')[0];

    const pages: IPages = {
      search: domain,
      loginPage: [],
      supportPage: [],
    }

    try {
      const login = `https://${company}.zendesk.com`
      const response = await axios.get(login);
      if (response.status === 200) {
        pages.loginPage = pages.loginPage.concat(login);
      }
    } catch (error: any) {
      console.log(error.message);
    }

    try {
      const supportUrl = `support.${domain}`
      const addresses = await resolveCname(supportUrl);
      pages.supportPage = pages.supportPage.concat(addresses);
    } catch (error) {
      console.log(error)
    }

    try {
      if (!pages.supportPage.length) {
        const helpUrl = `help.${domain}`
        const addresses = await resolveCname(helpUrl);
        pages.supportPage = pages.supportPage.concat(addresses);
      }
    } catch (error) {
      console.log(error)
    }
    return pages
  }))
  res.send(list);
})

export default router; 