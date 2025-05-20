# Web3.bio Profile Kit

<a href="https://web3.bio">
  <img width="200" height="200" src="https://github.com/web3bio/web3bio/blob/main/public/logo-web3bio.png?raw=true" alt="Web3.bio Profile Kit">
</a>

<p>
  <a href="https://www.npmjs.com/package/web3bio-profile-kit">
    <img src="https://img.shields.io/npm/v/web3bio-profile-kit?style=flat" alt="Version">
  </a>
  <a href="https://github.com/web3bio/web3bio-profile-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/web3bio-profile-kit?style=flat" alt="MIT License">
  </a>
  <a href="https://www.npmjs.com/package/web3bio-profile-kit">
    <img src="https://img.shields.io/npm/dm/web3bio-profile-kit?style=flat" alt="Downloads per month">
  </a>
</p>

## Introduction

Web3.bio Profile Kit is a lightweight React hooks library that enables developers to easily fetch on-chain and off-chain identity data from the [Web3.bio Profile API](https://api.web3.bio).

- 🔍 Query profiles by ENS, address, Lens handle, Farcaster, and more
- 🪝 Simple React hooks that handle loading and error states
- 📚 TypeScript ready with built-in type definitions
- 🔄 Easy batch queries for multiple identities

## Installation

```bash
# npm
npm install web3bio-profile-kit

# yarn
yarn add web3bio-profile-kit

# pnpm
pnpm add web3bio-profile-kit
```

## Usage

### Basic Profile Query

```tsx
import { useQueryProfile } from "web3bio-profile-kit";

function Profile() {
  // Query an ENS profile by ENS name (platform,identity format)
  const { data, isLoading, error } = useQueryProfile("ens,vitalik.eth", false, {
    // optional API key
    apiKey: "your_api_key"
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <img src={data?.avatar} alt={data?.identity} width="80" />
      <h2>{data?.displayName}</h2>
      <p>{data?.identity}</p>
    </div>
  );
}
```

### Available Hooks

The library provides three main hooks:

```tsx
// Profile data with detailed social links
useQueryProfile(identity, universal, options)

// Name service resolution data
useQueryNS(identity, universal, options)

// Domain details including resolver records
useQueryDomain(identity, options)
```

### Query Examples

```tsx
// Profile query with platform-specific format
const { data } = useQueryProfile("ens,vitalik.eth", false);

// Universal profile query (auto-detects platform)
const { data } = useQueryProfile("vitalik.eth", true);

// NS query with Ethereum address
const { data } = useQueryNS(
  "ethereum,0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  false
);

// Universal query for lens handle
const { data } = useQueryNS("stani.lens", true);

// Domain query
const { data } = useQueryDomain("sujiyan.eth");

// Batch query for multiple identities
const { data } = useQueryProfile(
  [
    "farcaster,dwr.eth",
    "ens,sujiyan.eth",
    "linea,184.linea.eth",
    "basenames,tony.base.eth",
    "ethereum,0x2EC8EBB0a8eAa40e4Ce620CF9f84A96dF68D4669"
  ],
  false
);
```

## API Key Configuration

You can provide your API key in three ways:

1. **Directly in options object**:
   ```tsx
   useQueryProfile("vitalik.eth", true, { apiKey: "your_api_key" });
   ```

2. **Using environment variables** (detected automatically):
   ```
   # .env file - use the appropriate prefix for your framework
   REACT_APP_WEB3BIO_API_KEY=your_api_key    # Create React App
   VITE_WEB3BIO_API_KEY=your_api_key         # Vite
   NEXT_PUBLIC_WEB3BIO_API_KEY=your_api_key  # Next.js
   WEB3BIO_API_KEY=your_api_key              # Other frameworks (if supported)
   ```

## License

[MIT](https://github.com/web3bio/web3bio-profile-kit/blob/main/LICENSE)

## Related Projects

- [Web3.bio](https://web3.bio) - Web3 identity search engine
- [Web3.bio Profile API](https://api.web3.bio) - Web3 profile data resolution API

---
Created with ❤️ for the Web3 community.
