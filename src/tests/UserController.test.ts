import {expect} from 'chai';
import app from '../config/app';
import {agent as request} from 'supertest';

describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
});

it('should create a user', async function () {
    const res = await request(app)
        .post('/api/user').send({
            firstName: 'Oswaldo',
            lastName: 'Lopez',
            email: 'g@g.com', 
            password: 'Clave'
        });
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("object");
});
// it('should GET /api/user', async function () {
//     const res = await request(app).get('/api/user');
//     expect(res.status).to.equal(200);
//     expect(res.body).not.to.be.empty;
//     expect(res.body.data).not.to.be.empty;
//     expect(res.body.data).to.be.an("array");
//     expect(res.body.error).to.be.empty;
// });