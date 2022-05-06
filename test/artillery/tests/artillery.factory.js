// https://yatyat2.tistory.com/m/115
// https://gist.github.com/whitehorse0/80ef3574fa8c971eaacf38bd3961cbfb
const fs = require('fs');
const { join } = require('path');
const LoadTesting = require('easygraphql-load-tester');
const { fileLoader } = require('merge-graphql-schemas');

class ArtilleryFactory {
  args;
  schema;
  queries;
  selectedQueries;
  basePath = __dirname;    // base directory path
  constructor(schemaPath, queriesPath, selectedQueries, args) {
    this._setSchema(schemaPath);
    this._setQueries(queriesPath);
    this._setSelectedQueries(selectedQueries);
    this._setArgs(args);
  }

  /**
   *
   * @returns {*}
   */
  run() {
    return new LoadTesting(this.schema, this.args)
      .artillery({
        customQueries: this.queries,
        onlyCustomQueries: true,
        selectedQueries: this.selectedQueries,
        queryFile: false,                         // 테스트한 graphql query 에 대한 파일 생성 안함
      });
  }

  _setSelectedQueries(selectedQueries) {
    this.selectedQueries = selectedQueries;
  }

  _setSchema(path) {
    this.schema = fs.readFileSync(join(this.basePath, path), 'utf8');
  }

  _setQueries(path) {
    this.queries = fileLoader(join(this.basePath, path));
  }

  _setArgs(args) {
    this.args = args;
  }
}

module.exports = { ArtilleryTest: ArtilleryFactory }


