import dnsimple from 'dnsimple';

export default class DNSimple {
  constructor() {
    this.client = dnsimple({
      accessToken: process.env.TOKEN,
    });
  }

  async load() {
    const { data: { account = {} } = {} } = await this.client.identity.whoami();
    this.account = account;

    return this;
  }

  async updateRecord(record, domain, post) {
    const { data } = await this
      .client
      .zones
      .updateZoneRecord(this.account.id, domain, record, post);

    return data;
  }
}
