# dnsimple-ddns-sync

## Setup

Install required `npm` modules:

```bash
npm install
```

Create `.env` file from `.env.example`

```bash
mv .env.example .env
```

Create `settings.json` file from `settings.json.example`

```bash
mv settings.json.example settings.json
```
## Configure `.env`

Update `.env` and replace `<access token id>` with an `Account token`

See DNSimple's [documentation](https://support.dnsimple.com/articles/api-access-token/) for more details

## Configure `settings.json`

Add or remove entries to `settings.json` under the `records` property as needed.

The format is as follows:

```json
{
    "id": "<record id>",
    "domain": "<domain name>",
    "type": "<ip address type, IPv4 for A records and IPv6 for AAAA records>",
    "address": "<last synced ip, leave blank to force update on first run>"
}
```

Example:
```json
{
    "id": "1234", // A type record
    "domain": "example.com",
    "type": "ipv4", // ipv4 since record is type "A"
    "address": ""
}
```
```json
{
    "id": "6789", // AAAA type record
    "domain": "example.com",
    "type": "ipv6", // ipv6 since record is type "AAAA"
    "address": ""
}
```

## To Do List
- [ ] Lookup record type and automatically determine if it's ipv4/ipv6
  - [ ] Remove dependency of `type` from `settings.json`
