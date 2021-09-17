import ip from 'public-ip';

export default class IP {
  constructor() {
    this.cache = {
      ipv4: null,
      ipv6: null,
    };
  }

  async lookup() {
    this.cache.ipv4 = await ip.v4();
    this.cache.ipv6 = await ip.v6();
  }

  ipv4(compare = null) {
    return !compare ? this.cache.ipv4 : this.cache.ipv4 === compare;
  }

  ipv6(compare = null) {
    return !compare ? this.cache.ipv6 : this.cache.ipv6 === compare;
  }
}
