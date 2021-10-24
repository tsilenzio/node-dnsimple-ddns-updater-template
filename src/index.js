import { IP, DNSimple, Settings } from './lib';

const ip = new IP();
const dns = new DNSimple();

const settings = new Settings('./settings.json');
const { records } = settings.load();

async function processRecords() {
  // Lookup public ip address
  await ip.lookup();
  await dns.load();

  const updates = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const record of records) {
    // Store reference to ip version: ipv4/ipv6
    const ver = record.type;

    // Check if the ip from settings matches the public ip
    if (!ip[ver](record.address)) {
      const {
        id,
        domain,
        label,
        address,
        ttl = 600,
      } = record;

      // Update IP in settings and on DNSimple
      console.info(`Updating record ${id} ${ver} for ${label} from ${address} to ${ip[ver]()}`);
      updates.push(dns.updateRecord(id, domain, {
        content: ip[ver](),
        ttl,
      }));

      // Overwrite the old ip with the new ip
      record.address = ip[ver]();
    }
  }

  // Display info on console to what got updates
  Promise.all(updates).then((results) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      const {
        id, name, zone_id: domain, content: address,
      } = result;
      const fqdn = name === '' ? domain : `${name}.${domain}`;
      console.info(`Updated record ${id} for ${fqdn} to ${address}`);
    }
  }).then(() => {
    // Save the IP changes if anything changed
    if (updates.length) {
      settings.save();
    } else {
      console.info('No records need to be updated');
    }
  }).catch(err => console.error(err));
}

processRecords();
