/* eslint-disable no-undef */
const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const validator = require('../validators/index');

let cookie;

describe('API routes', () => {
  describe('GET /', () => {
    it('Should load the index page', async () => {
      const res = await request(app).get('/').expect(200);
      cookie = res.headers['set-cookie'];
    });
  });
  describe('POST /', () => {
    it('Should return a 302 redirect on success, max value allowed 10', async () => {
      const res = await request(app)
        .post('/')
        .send({
          text: '2414124141',
        })
        .set('Cookie', cookie)
        .expect(302);
      assert.deepStrictEqual(res.text, 'Found. Redirecting to /success');
    });
    it('Should return a 302 redirect on success, min value allowed 1', async () => {
      const res = await request(app)
        .post('/')
        .send({
          text: '2',
        })
        .set('Cookie', cookie)
        .expect(302);
      assert.deepStrictEqual(res.text, 'Found. Redirecting to /success');
    });
    it('Should render index and show error message in HTML', async () => {
      const res = await request(app)
        .post('/')
        .send({
          text: '24141241434324234', // length > 10
        })
        .set('Cookie', cookie)
        .expect(200);
      assert.deepStrictEqual(res.text, '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Please submit some text</h1><form action="/" method="post"><input type="text" name="text" value="24141241434324234"><div data-cy="error-container"><p style="background-color:red;color:white;">text is invalid, max length allowed 10 recieved 17</p></div><button type="submit">Submit</button></form></body></html>');
    });
  });
  describe('GET /success', () => {
    it('Should show success page, access key valid', async () => {
      await request(app).get('/success').set('Cookie', cookie).expect(200);
    });
    it('Should redirect back to index, access key invalid', async () => {
      await request(app).get('/success').expect(302);
    });
  });
});

describe('Validator', () => {
  beforeEach(() => {
    validator.reset();
  });
  it('Should return 0 errors, maxlength < 10', () => {
    const body = { text: '012345678' };
    validator.body('text', body.text).maxlength(10);
    assert.deepStrictEqual(validator.errors.length, 0);
  });
  it('Should return 0 errors, maxlength === 10', () => {
    const body = { text: '0123456789' };
    validator.body('text', body.text).maxlength(10);
    assert.deepStrictEqual(validator.errors.length, 0);
  });
  it('Should return 1 error, maxlength > 10', () => {
    const body = { text: '0123456789A' };
    validator.body('text', body.text).maxlength(10);
    assert.deepStrictEqual(validator.errors.length, 1);
    assert.deepStrictEqual(validator.errors[0].message, 'text is invalid, max length allowed 10 recieved 11');
  });
  it('Should return 1 error, field not found', () => {
    const body = { unknown: '0123456789A' };
    validator.body('text', body.text).required().maxlength(10);
    assert.deepStrictEqual(validator.errors.length, 1);
    assert.deepStrictEqual(validator.errors[0].message, 'text not found in request body');
  });
  it('Should return 1 error, invalid minlength', () => {
    const body = { text: '' };
    validator.body('text', body.text).minlength(1);
    assert.deepStrictEqual(validator.errors.length, 1);
    assert.deepStrictEqual(validator.errors[0].message, 'text is invalid, min length allowed 1 recieved 0');
  });
});
