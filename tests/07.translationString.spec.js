describe('TranslationString mixin should', () => {
  it('retrieve the translations strings list for english', () => {
   return expect(txApi.translationStrings(slug, 'resourcetest', 'en'))
     .to.eventually.have.deep.property('data[0].translation', 'derp')
  });
  it('retrieve a specific translation string for english', () => {
   return expect(txApi.translationString(slug, 'resourcetest', 'en', 'hello world'))
     .to.eventually.have.deep.property('data.translation', 'derp')
  });
  it('update a specific translation string list for english', () => {
   return expect(txApi.translationStringUpdate(slug, 'resourcetest', 'en', 'hello world', {
     translation: 'Hello'
   })).to.eventually.have.property('status', 200)
  });
  it('retrieve the updated translation string for english', () => {
   return expect(txApi.translationString(slug, 'resourcetest', 'en', 'hello world'))
     .to.eventually.have.deep.property('data.translation', 'Hello')
  });
});
