import promisify from 'cypress-promise';

describe('Trigger action', () => {
  it('successfully triggers outgoing api call', async () => {
    const res = await promisify(
      cy
        .request('POST', '/api/trigger', {
          url: 'https://api.agify.io',
          action: 'GET',
          triggerInput: 'name',
          triggerInputValue: 'dupe',
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.code).to.equal(200);
        }),
    );
  });

  it('throws bad request on trigger due to invalid/missing input', async () => {
    const res = await promisify(
      cy
        .request({
          url: '/api/trigger',
          method: 'POST',
          body: {
            url: 'https://api.agify.io',
            triggerInputValue: 'dupe',
          },
          failOnStatusCode: false,
        })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('validation error occured');
          expect(res.body.error)
            .to.be.an('array')
            .to.have.lengthOf(2)
            .to.deep.equal(['action is required', 'triggerInput is required']);
        }),
    );
  });
});
