  <a href="https://web3.bio">
    <img width="200" height="200" src="https://github.com/web3bio/web3bio/blob/main/public/logo-web3bio.png?raw=true" alt="Web3.bio Profile Kit" width="auto" height="60">
  </a>

<h1>
  Web3bio Profile Kit
</h1>

  <a href="https://www.npmjs.com/package/web3bio-profile-kit">
    <img src="https://img.shields.io/npm/v/web3bio-profile-kit?style=flat" alt="Version">
  </a>
  <a href="https://github.com/web3bio/web3bio-profile-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/web3bio-profile-kit?style=flat" alt="MIT License">
  </a>
  <a href="https://www.npmjs.com/package/web3bio-profile-kit">
    <img src="https://img.shields.io/npm/dm/web3bio-profile-kit?style=flat" alt="Downloads per month">
  </a>

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

```tsx
import { useQueryProfile } from "web3bio-profile-kit";

function Profile() {
  // Query an ENS profile by ENS name
  const { data, isLoading, error } = useQueryProfile("ens,vitalik.eth", {
    path: "profile",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <img src={data?.avatar} alt={data?.identity} width="80" />
      <h2>{data?.displayName}</h2>
      <p>{data?.identity}</p>
    </div>
  );
}
```

### Query by different ways

```tsx
// Profile query for ENS name
const { data } = useQueryProfile("ens,vitalik.eth", { path: "profile" });

// NS query for Ethereum address
const { data } = useQueryProfile(
  "ethereum,0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  { path: "ns" },
);

// Universal query for lens
const { data } = useQueryProfile("stani.lens", { path: "profile" });

// Batch query for multiple platforms
const { data } = useQueryProfile(
  [
    "farcaster,dwr.eth",
    "suji_yan.twitter",
    "linea,184.liena",
    "tony.base",
    "ens,nick.eth",
  ],
  { path: "ns" },
);
```

## License

[MIT](https://github.com/web3bio/web3bio-profile-kit/blob/main/LICENSE)

## Related Projects

- [Web3.bio](https://web3.bio) - Web3 identity search engine
- [Web3.bio Profile API](https://api.web3.bio) - Web3 profile data resolution API

---
Created with ❤️ for the Web3 community.
