const request = require('supertest');

const createServer = require('../server');
  
const app = createServer();
   
describe('Validate fields', () => {
  it('Missing Email', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        // title: "Post 1",
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Missing Email');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Email less than 5 characters', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'abcd',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Email less than 5 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Email greater than 50 characters', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Email greater than 50 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  }); 










  it('Missing First Name', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Missing First Name');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('First Name less than 1 character', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: '',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('First Name less than 1 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('First Name greater than 20 characters', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'abcdefghijklmnopqrstuvwxyz',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('First Name greater than 20 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });









  it('Missing Last Name', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Missing Last Name');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Last Name less than 1 character', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: '',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Last Name less than 1 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Last Name greater than 20 characters', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: 'abcdefghijklmnopqrstuvwxyz',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Last Name greater than 20 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });









  it('Missing Phone Number', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Missing Phone Number');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Phone Number less than 11 character', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
        Phone: '123',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Phone Number less than 11 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });

  it('Phone Number greater than 11 characters', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
        Phone: '123456789012',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Phone Number greater than 11 characters');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });




  it('Missing Sandbox Key', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam2211@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
        Phone: '12345678901',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Missing Sandbox Key');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });


  it('Enrollee Exists', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'simple@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
        Phone: '12345678901',
        Sandbox_Key: '12345678901',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Enrollee exists');
        expect(response.body.Response).toBe('Fail');
        done();
      });
  });


  
  it('All fields look ok', async (done) => {
    await request(app)
      .post('/api/')
      .send({
        Email: 'sam@yahoo.com',
        FirstName: 'sam',
        LastName: 'james',
        Phone: '12345678901',
        Sandbox_Key: 'x',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body.Message).toBe('Enrollee data captured successfully');
        expect(response.body.Response).toBe('Successful');
        done();
      });
  });  
  
}); 
