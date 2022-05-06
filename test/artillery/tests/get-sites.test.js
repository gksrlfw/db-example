const {ArtilleryTest} = require("./artillery.factory");

class GetSitesTest {
  static schemaPath = '../schemas/schema.graphql';
  static queriesPath = '../queries/get-sites.graphql';
  static selectedQueries = ['getSites'];
  static queryArgs = {
    getSites: [
      {
        from: "2022-05-04T00:00:00+09:00",
        to: "2022-05-05T00:00:00+09:00",
      },
    ]
  };

  static test() {
    return new ArtilleryTest(
      this.schemaPath,
      this.queriesPath,
      this.selectedQueries,
      this.queryArgs
    )
      .run();
  }
}

module.exports = { GetSitesTest: GetSitesTest.test() };