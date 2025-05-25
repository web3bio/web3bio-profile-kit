# Web3.bio Profile Kit

A lightweight React hooks library for easily integrating Web3.bio profile data into your applications.

## Installation

```bash
npm install web3bio-profile-kit
# or
yarn add web3bio-profile-kit
# or
pnpm add web3bio-profile-kit
```

## Overview

Web3.bio Profile Kit provides React hooks for querying the [Web3.bio Profile API](https://api.web3.bio/), which offers unified profile data across multiple Web3 platforms. This library makes it easy to fetch user profiles, name service information, and domain data.

More information about the Web3.bio Profile API can be found in the [document](https://api.web3.bio/).

## API Key

The Profile API is free, but usage without API keys includes rate limiting mechanisms to ensure fair usage and prevent abuse. If you need an API Key, you can obtain one by contacting Web3.bio via [Twitter (X)](https://x.com/web3bio) or [Telegram group](https://t.me/web3dotbio).

You can set your API key using environment variables:

```
WEB3BIO_API_KEY=your_api_key
# or
REACT_APP_WEB3BIO_API_KEY=your_api_key
# or
NEXT_PUBLIC_WEB3BIO_API_KEY=your_api_key
# or
VITE_WEB3BIO_API_KEY=your_api_key
```

## Usage

### Query Profile Data

#### Platform-Specific Profile Queries

```jsx
import { useProfile } from 'web3bio-profile-kit';

function ProfileComponent() {
  // Query with explicit platform format
  const { data, isLoading, error } = useProfile("ens,vitalik.eth");

  // Or simplified format without the platform prefix
  // const { data, isLoading, error } = useProfile("vitalik.eth");
  // Or with Ethereum address
  // const { data, isLoading, error } = useProfile("ethereum,0x123...");
  // Or Farcaster, Lens, Basenames, Linea names and more

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.displayName || data?.identity}</h1>
      {data?.avatar && <img src={data.avatar} alt="Profile" />}
      <p>{data?.description}</p>
    </div>
  );
}
```

#### Universal Profile Queries

```jsx
import { useUniversalProfile } from 'web3bio-profile-kit';

function UniversalProfileComponent() {
  // Query by any identity format - ENS domain, Farcaster handle, etc.
  const { data, isLoading, error } = useUniversalProfile("vitalik.eth");

  // Or with any other identity
  // const { data, isLoading, error } = useUniversalProfile("dwr.eth.farcaster");
  // const { data, isLoading, error } = useUniversalProfile("0x123...");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.displayName || data?.identity}</h1>
      {data?.avatar && <img src={data.avatar} alt="Profile" />}
      <p>{data?.description}</p>
    </div>
  );
}
```

### Query Name Service Data

#### Platform-Specific Name Service Queries

```jsx
import { useNS } from 'web3bio-profile-kit';

function NameServiceComponent() {
  const { data, isLoading } = useNS("ens,vitalik.eth");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data?.displayName}</h2>
      <p>Address: {data?.address}</p>
    </div>
  );
}
```

#### Universal Name Service Queries

```jsx
import { useUniversalNS } from 'web3bio-profile-kit';

function UniversalNameServiceComponent() {
  // Works with any identity format
  const { data, isLoading } = useUniversalNS("vitalik.eth");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data?.displayName}</h2>
      <p>Address: {data?.address}</p>
    </div>
  );
}
```

### Query Domain Data

```jsx
import { useDomain } from 'web3bio-profile-kit';

function DomainComponent() {
  const { data, isLoading } = useDomain("vitalik.eth");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data?.identity}</h2>
      <p>Resolved address: {data?.resolvedAddress}</p>
      <p>Owner address: {data?.ownerAddress}</p>
    </div>
  );
}
```

### Batch Profile Query

```jsx
import { useProfile } from 'web3bio-profile-kit';

function BatchProfileComponent() {
  const { data, isLoading } = useProfile([
    "vitalik.eth",
    "lens,stani"
  ]);

  // You can also use useNS for batch queries
  // const { data, isLoading } = useNS([
  //   "vitalik.eth",
  //   "lens,stani"
  // ]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {Array.isArray(data) && data.map(profile => (
        <div key={profile.identity}>
          <h3>{profile.displayName}</h3>
          <p>{profile.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Advanced Usage: Controlling Query Execution

You can control when the query executes using the `enabled` option:

```jsx
const [searchTerm, setSearchTerm] = useState("");
const { data, isLoading } = useProfile(searchTerm, {
  enabled: searchTerm.length > 0
});
```

## Supported Identity Formats

- ENS domains: `name.eth`
- Ethereum addresses: `0x123...`
- Farcaster: `username.farcaster`
- Lens profiles: `username.lens`
- And many more!

You can also use the explicit format `platform,identity` for clarity:
- `ens,vitalik.eth`
- `ethereum,0x123...`
- `farcaster,dwr.eth`
- `lens,stani.lens`

## API Reference

### Hooks

#### `useProfile(identity, options?)`

Fetches comprehensive profile data including social links and avatar.

#### `useUniversalProfile(identity, options?)`

Fetches comprehensive universal profile data including social links and avatar across multiple platforms.

#### `useNS(identity, options?)`

Fetches basic name service data (similar to ENS lookups).

#### `useUniversalNS(identity, options?)`

Fetches basic universal name service data across multiple platforms.

#### `useDomain(identity, options?)`

Fetches detailed domain information including resolution data.

### Arguments

| Parameter | Type | Description |
|-----------|------|-------------|
| `identity` | `string` or `string[]` | Identity to query or array of identities for batch queries |
| `options` | `object` | Optional configuration with `apiKey` and `enabled` |

### Return Values

All hooks return an object with:

| Property | Type | Description |
|-----------|------|-------------|
| `data` | `object` or `null` | The profile data when successful |
| `isLoading` | `boolean` | `true` during the fetch operation |
| `error` | `Error` or `null` | Error object if the request failed |

## License

MIT
