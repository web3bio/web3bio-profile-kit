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

Web3.bio Profile Kit provides React hooks for querying the Web3.bio Profile API, which offers unified profile data across multiple Web3 platforms. This library makes it easy to fetch user profiles, name service information, and domain data.

## API Key

While the Web3.bio Profile API can be used without an API key, it's recommended to use one for production applications to avoid rate limiting.

You can set your API key using environment variables:

```
NEXT_PUBLIC_WEB3BIO_API_KEY=your_api_key
# or
REACT_APP_WEB3BIO_API_KEY=your_api_key
# or
VITE_WEB3BIO_API_KEY=your_api_key
# or
WEB3BIO_API_KEY=your_api_key
```

Or pass it directly to the hooks:

```jsx
const { data } = useProfile("vitalik.eth", { apiKey: "your_api_key" });
```

## Usage

### Query Profile Data

#### Standard Profile Queries (Platform-Specific)

```jsx
import { useProfile } from 'web3bio-profile-kit';

function ProfileComponent() {
  // Query with explicit platform format
  const { data, isLoading, error } = useProfile("farcaster,dwr");

  // Or with Ethereum address
  // const { data, isLoading, error } = useProfile("ethereum,0x123...");

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

#### Universal Profile Queries (Any Identity Format)

```jsx
import { useUniversalProfile } from 'web3bio-profile-kit';

function UniversalProfileComponent() {
  // Query by any identity format - ENS domain, Farcaster handle, etc.
  const { data, isLoading, error } = useUniversalProfile("vitalik.eth");

  // Or with any other identity
  // const { data, isLoading, error } = useUniversalProfile("dwr.farcaster");
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

#### Standard Name Service Queries

```jsx
import { useNS } from 'web3bio-profile-kit';

function NameServiceComponent() {
  // Requires platform-specific format
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

### Query Multiple Identities

```jsx
import { useProfile } from 'web3bio-profile-kit';

function MultiProfileComponent() {
  const { data, isLoading } = useProfile([
    "vitalik.eth",
    "lens,stani"
  ]);

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
- Lens profiles: `username.lens`
- Farcaster: `username`
- And many more!

You can also use the explicit format `platform,identity` for clarity:
- `ens,vitalik.eth`
- `ethereum,0x123...`
- `farcaster,dwr`

## API Reference

### Hooks

#### `useProfile(identity, options?, universal?)`

Fetches comprehensive profile data including social links and avatar.

#### `useNS(identity, options?, universal?)`

Fetches basic name service data (similar to ENS lookups).

#### `useDomain(identity, options?, universal?)`

Fetches detailed domain information including resolution data.

### Arguments

| Parameter | Type | Description |
|-----------|------|-------------|
| `identity` | `string` or `string[]` | Identity to query or array of identities for batch queries |
| `options` | `object` | Optional configuration with `apiKey` and `enabled` |
| `universal` | `boolean` | Whether to use universal lookup (default: `false`) |

### Return Values

All hooks return an object with:

| Property | Type | Description |
|-----------|------|-------------|
| `data` | `object` or `null` | The profile data when successful |
| `isLoading` | `boolean` | `true` during the fetch operation |
| `error` | `Error` or `null` | Error object if the request failed |

## License

MIT
