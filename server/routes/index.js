const express = require('express');
const RelianceRequest = require('../lib/RelianceHMO_Requests');

const db = require('../db');

const router = express.Router();
const badField = (field, res, fieldName, min, max) => {
  if (field === undefined) {
    res.json({ Response: 'Fail', Message: `Missing ${fieldName}` });
    return true;
    // eslint-disable-next-line no-else-return
  } else if (field.trim().length < min) {
    res.json({ Response: 'Fail', Message: `${fieldName} less than ${min} characters` });
    return true;
    // eslint-disable-next-line no-else-return
  } else if (field.trim().length > max) {
    res.json({ Response: 'Fail', Message: `${fieldName} greater than ${max} characters` });
    return true;
  }
  return false;
};
const fieldExits = (body, res) => {
  if (badField(body.Email, res, 'Email', 5, 50)) {
    return true;
    // eslint-disable-next-line no-else-return
  } else if (badField(body.FirstName, res, 'First Name', 1, 20)) {
    return true;
    // eslint-disable-next-line no-else-return
  } else if (badField(body.LastName, res, 'Last Name', 1, 20)) {
    return true;
    // eslint-disable-next-line no-else-return
  } else if (badField(body.Phone, res, 'Phone Number', 11, 11)) {
    return true;
    // eslint-disable-next-line no-else-return
  } else if (body.Sandbox_Key === undefined) {
    res.json({ Response: 'Fail', Message: 'Missing Sandbox Key' });
    return true;
    // eslint-disable-next-line no-else-return
  }
  return false;
};
router.post('/', async (req, res) => {
  let jsonSent = false;
  jsonSent = fieldExits(req.body, res);
  if (!jsonSent) {
    try {
      const results = await db.getEnrollee(req.body.Email);
      if (results.length > 0) {
        res.json({ Response: 'Fail', Message: 'Enrollee exists' });
      } else {
        let firstName = req.body.FirstName;
        let lastName = req.body.LastName;
        let email = req.body.Email;
        let phone = req.body.Phone;
        firstName = 'John';
        lastName = 'Doe';
        email = 'testuser1@kang.pe';
        phone = '08132646940';

        const paramsValue = {
          data: {
            Referral_code: '1122345',
            enrollees: [
              {
                payment_frequency: 'monthly',
                first_name: firstName,
                last_name: lastName,
                email_address: email,
                phone_number: phone,
                plan_id: 22,
                can_complete_profile: true,
                dependants: [
                  {
                    first_name: 'Janet',
                    last_name: 'Dependant',
                    email_address: 'testuser2@kang.pe',
                    phone_number: '08132646940',
                    plan_id: 22,
                  },
                  {
                    first_name: 'Fred',
                    last_name: 'Dependant',
                    email_address: 'testuser3@kang.pe',
                    phone_number: '08132646940',
                    plan_id: 24,
                  },
                ],
              },
              {
                payment_frequency: 'q',
                first_name: 'Ben',
                last_name: 'Stiller',
                email_address: 'snr22325@awsoo.com',
                phone_number: '08132646940',
                plan_id: 24,
                can_complete_profile: false,
                dependants: [],
              },
            ],
          },
        };
        const response = await RelianceRequest.SignUp({
          sandbox_key: req.body.Sandbox_Key,
          host: '',
          payload: paramsValue,
        });
        if (response.message === 'OK') {
          const resultsInsert = await db.addEnrollee([req.body.Email,
            req.body.FirstName,
            req.body.LastName,
            req.body.Phone]);
          if (resultsInsert.affectedRows != null) {
            res.json({ Response: 'Successful', Message: 'Enrollee data captured successfully' });
          }
        } else {
          res.json({ Response: 'Fail', Message: 'Error ocurred during data caputure' });
        }
      }
    } catch (e) {
      if (e.sqlMessage != null) {
        res.json({ Response: 'Fail', Message: 'Error ocurred during database update' });
      } else {
        res.json({ Response: 'Fail', Message: 'Error ocurred during data caputure' });
      }
    }
  }
});

module.exports = router;
