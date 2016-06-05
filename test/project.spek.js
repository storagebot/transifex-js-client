import TransifexApi from '../src/transifex-api.js';

var txApi = TransifexApi.connect({
  username: 'alexapi1',
  password: 'alexapi1',
});

var slug = 'project' + require('shortid').generate();

var payload = {
  name: slug,
  slug: slug,
  private: true,
  description: 'this is an automated test',
  source_language_code: 'af'
}

describe('Project mixin should', () => {
  it('create a new project', () => {
    return expect(txApi.projectCreate(payload))
      .to.eventually.have.property('statusCode', 201);
  });
  it('fail, if the slug already exists', () => {
    return expect(txApi.projectCreate(payload))
      .to.eventually.be.rejected;
  });
  it('update the description of an existing project', () => {
    return expect(txApi.projectUpdate( slug, {
      description: 'this is an updated description',
    })).to.eventually.have.property('statusCode', 200);
  });
  it('retrieve the updated description of an existing project', () => {
    return expect(txApi.projectRead(slug))
      to.eventually.have.property('statusCode', 200)
      .and.to.have.property('body.description', 'this is an updated description')
  });
  it('retrieve the list of all projects', () => {
    return expect(txApi.projects()).
      to.eventually.have.property('body').with.length.above(0)
      //Projects list length should not equal 0 because we added a project
  });
  it('delete the project that it created', () => {
    return expect(txApi.projectDelete(slug)).
      to.eventually.have.property('statusCode', 204)
  });
});
