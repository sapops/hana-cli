const cds = require('@sap/cds');

module.exports = class extends cds.ApplicationService {
  async init() {
    this.before('SELECT', (req) => {
      Object.assign(
        req.context.query.SELECT,
        JSON.parse(
          JSON.stringify(req.context.query.SELECT).replaceAll('public.', '')
        )
      );
    });
    await super.init();
  }
};
