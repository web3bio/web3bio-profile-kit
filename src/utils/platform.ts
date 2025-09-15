import { Platform, PlatformSystem, type PlatformType } from "../types/platform";

/**
 * Default data
 * @internal
 */
export const DEFAULT_PLATFORM: Readonly<PlatformType> = {
  color: "#000000",
  icon: "",
  label: "",
  description: "",
  urlPrefix: "",
  ensText: [],
  registerlink: "",
  editUrlPrefix: "",
  system: PlatformSystem.web3,
};

/**
 * Platform data
 * @public
 */
export const PLATFORM_DATA: ReadonlyMap<
  Platform,
  Readonly<PlatformType>
> = new Map([
  [
    Platform.ailayer,
    {
      color: "#A283FF",
      icon: "icons/icon-ailayer.svg",
      label: "AILayer Name Service",
      urlPrefix: "https://mainnet-explorer.ailayer.xyz/address/",
      registerlink: "https://space.id/tld/19/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.alienx,
    {
      color: "#D5F462",
      icon: "icons/icon-alienx.svg",
      label: "AlienX Name Service",
      urlPrefix: "https://explorer.alienxchain.io/address/",
      registerlink: "https://space.id/tld/17/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.aptos,
    {
      color: "#6fe0b2",
      icon: "icons/icon-aptos.svg",
      label: "Aptos",
      urlPrefix: "https://explorer.aptoslabs.com/account/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.arbitrum,
    {
      color: "#2949d4",
      icon: "icons/icon-arbitrum.svg",
      label: ".arb Name Service",
      urlPrefix: "https://arbiscan.io/address/",
      registerlink: "https://space.id/tld/2/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.basenames,
    {
      color: "#0052ff",
      icon: "icons/icon-base.svg",
      label: "Basenames",
      description: "Basenames (.base.eth domains) based on ENS",
      urlPrefix: "https://www.base.org/name/",
      editUrlPrefix: "https://www.base.org/name/{name}",
      registerlink: "https://www.base.org/names?claim={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.bilibili,
    {
      color: "#00aeec",
      icon: "icons/icon-bilibili.svg",
      label: "Bilibili",
      urlPrefix: "https://www.bilibili.com/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.bitcoin,
    {
      color: "#F7931A",
      icon: "icons/icon-bitcoin.svg",
      label: "Bitcoin",
      urlPrefix: "https://explorer.cloverpool.com/btc/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.bluesky,
    {
      color: "#0085ff",
      icon: "icons/icon-bluesky.svg",
      label: "Bluesky",
      urlPrefix: "https://bsky.app/profile/",
      ensText: ["app.bsky", "bluesky"],
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.box,
    {
      color: "#1a1a1a",
      icon: "icons/icon-box.svg",
      label: "Box",
      registerlink: "https://my.box/buy/configure?domain={name}&ref=web3bio",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.bsc,
    {
      color: "#f0b90b",
      icon: "icons/icon-bsc.svg",
      label: "Binance Smart Chain",
      urlPrefix: "https://bscscan.com/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.calendly,
    {
      color: "#2F69F6",
      icon: "icons/icon-calendly.svg",
      label: "Calendly",
      urlPrefix: "https://calendly.com/",
      ensText: ["calendly", "com.calendly"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.ckb,
    {
      color: "#000000",
      icon: "icons/icon-ckb.svg",
      label: "Nervos",
      urlPrefix: "https://explorer.nervos.org/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.clusters,
    {
      color: "#f0555d",
      icon: "icons/icon-clusters.svg",
      label: "Clusters",
      urlPrefix: "https://clusters.xyz/",
      registerlink: "https://clusters.xyz/register/{name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.coingecko,
    {
      color: "#4BCC00",
      icon: "icons/icon-coingecko.svg",
      label: "CoinGecko",
      urlPrefix: "https://www.coingecko.com/en/coins/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.cosmos,
    {
      color: "#000000",
      icon: "icons/icon-cosmos.svg",
      label: "Cosmos",
      urlPrefix: "https://www.mintscan.io/cosmos/account/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.crossbell,
    {
      color: "#FFCF55",
      icon: "icons/icon-crossbell.svg",
      label: "Crossbell",
      urlPrefix: "https://crossbell.io/@",
      registerlink: "https://crossbell.io",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.cyberconnect,
    {
      color: "#000000",
      icon: "icons/icon-cyberconnect.svg",
      label: "CyberConnect",
      urlPrefix: "https://link3.to/",
      registerlink: "",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.degenscore,
    {
      color: "#a855f7",
      icon: "icons/icon-degenscore.svg",
      label: "DegenScore",
      urlPrefix: "https://degenscore.com/beacon/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.discord,
    {
      color: "#5865f2",
      icon: "icons/icon-discord.svg",
      label: "Discord",
      urlPrefix: "",
      ensText: ["discord", "com.discord"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.dns,
    {
      color: "#000000",
      icon: "icons/icon-web.svg",
      label: "DNS",
      urlPrefix: "https://",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.doge,
    {
      color: "#dfc66d",
      icon: "icons/icon-doge.svg",
      label: "Dogecoin",
      urlPrefix: "https://dogechain.info/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.dotbit,
    {
      color: "#0e7dff",
      icon: "icons/icon-dotbit.svg",
      label: ".bit",
      urlPrefix: "https://d.id/",
      registerlink: "https://d.id/bit/account/create/{name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.ecp,
    {
      color: "#000000",
      icon: "icons/icon-ecp.svg",
      label: "Ethereum Comments Protocol",
      registerlink: "https://www.ethcomments.xyz/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.edgeless,
    {
      color: "#a0eb67",
      icon: "icons/icon-edgeless.svg",
      label: "Edgeless",
      urlPrefix: "https://explorer.edgeless.network/address/",
      registerlink: "",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.efp,
    {
      color: "#FFE067",
      icon: "icons/icon-efp.svg",
      label: "Ethereum Follow Protocol",
      urlPrefix: "https://ethfollow.xyz/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.ens,
    {
      color: "#0080bc",
      icon: "icons/icon-ens.svg",
      label: "ENS",
      description: "Ethereum Name Service (ENS and .eth domain)",
      urlPrefix: "https://app.ens.domains/",
      registerlink: "https://app.ens.domains/{name}",
      editUrlPrefix: "https://app.ens.domains/{name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.ethereum,
    {
      color: "#3741ba",
      icon: "icons/icon-ethereum.svg",
      label: "Ethereum",
      urlPrefix: "https://etherscan.io/address/",
      editUrlPrefix: "https://app.ens.domains/{name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.facebook,
    {
      color: "#385898",
      icon: "icons/icon-facebook.svg",
      label: "Facebook",
      urlPrefix: "https://www.facebook.com/",
      ensText: ["com.facebook", "facebook"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.farcaster,
    {
      color: "#432C8D",
      icon: "icons/icon-farcaster.svg",
      label: "Farcaster",
      description: "Farcaster social identity (Fname handle)",
      urlPrefix: "https://farcaster.xyz/",
      editUrlPrefix: "https://farcaster.xyz/~/settings",
      ensText: ["farcaster", "xyz.farcaster"],
      registerlink:
        "https://farcaster.xyz/~/invite-page/1000?id=8ebad588&name={name}",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.firefly,
    {
      color: "#1A183D",
      icon: "icons/icon-firefly.svg",
      label: "Firefly",
      urlPrefix: "https://firefly.social/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.genome,
    {
      color: "#6DD85D",
      icon: "icons/icon-gnosis.svg",
      label: "Genome",
      urlPrefix: "https://genomedomains.com/name/",
      registerlink: "https://space.id/tld/14/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.github,
    {
      color: "#000000",
      icon: "icons/icon-github.svg",
      label: "GitHub",
      urlPrefix: "https://github.com/",
      ensText: ["com.github", "vnd.github", "github"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.gitcoin,
    {
      color: "#4A47D3",
      icon: "icons/icon-gitcoin.svg",
      label: "Gitcoin Passport",
      urlPrefix: "https://passport.gitcoin.co/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.gnosis,
    {
      color: "#1c352a",
      icon: "icons/icon-gnosis.svg",
      label: "Gnosis",
      urlPrefix: "https://gnosisscan.io/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.gravity,
    {
      color: "#FFAC43",
      icon: "icons/icon-gravity.svg",
      label: "Gravity Name Service",
      registerlink: "https://space.id/tld/23/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.guild,
    {
      color: "#6062eb",
      icon: "icons/icon-guild.svg",
      label: "Guild",
      urlPrefix: "https://guild.xyz/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.hackernews,
    {
      color: "#ff6600",
      icon: "icons/icon-hackernews.svg",
      label: "Hacker News",
      urlPrefix: "https://news.ycombinator.com/user?id=",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.hey,
    {
      color: "#E84F64",
      icon: "icons/icon-hey.svg",
      label: "Hey",
      urlPrefix: "https://hey.xyz/u/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.humanpassport,
    {
      color: "#006b57",
      icon: "icons/icon-humanpassport.svg",
      label: "Human Passport",
      urlPrefix: "https://passport.human.tech/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.instagram,
    {
      color: "#E1306C",
      icon: "icons/icon-instagram.svg",
      label: "Instagram",
      urlPrefix: "https://www.instagram.com/",
      ensText: ["com.instagram", "instagram"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.keybase,
    {
      color: "#4162E2",
      icon: "icons/icon-keybase.svg",
      label: "Keybase",
      urlPrefix: "https://keybase.io/",
      ensText: ["io.keybase", "keybase"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.lens,
    {
      color: "#2CC256",
      icon: "icons/icon-lens.svg",
      label: "Lens",
      description: "Lens social identity (.lens handle)",
      urlPrefix: "https://hey.xyz/u/",
      editUrlPrefix: "https://hey.xyz/settings",
      ensText: ["lens"],
      registerlink: "https://www.lens.xyz/mint?name={name}",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.lightlink,
    {
      color: "#00BFFF",
      icon: "icons/icon-lightlink.svg",
      label: "LightLink Name Service",
      urlPrefix: "https://phoenix.lightlink.io/address/",
      registerlink: "https://space.id/tld/9/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.linea,
    {
      color: "#591FE6",
      icon: "icons/icon-linea.svg",
      label: "Linea Name Service",
      description: "Linea Name Service (.linea.eth domains) based on ENS",
      urlPrefix: "https://names.linea.build/",
      editUrlPrefix: "https://names.linea.build/{name}",
      registerlink: "https://names.linea.build/{name}/register",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.linkedin,
    {
      color: "#195DB4",
      icon: "icons/icon-linkedin.svg",
      label: "LinkedIn",
      urlPrefix: "https://www.linkedin.com/in/",
      ensText: ["com.linkedin", "linkedin"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.lobsters,
    {
      color: "#ac130d",
      icon: "icons/icon-lobsters.svg",
      label: "Lobsters",
      urlPrefix: "https://lobste.rs/~",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.manta,
    {
      color: "#0091ff",
      icon: "icons/icon-manta.svg",
      label: "Manta Name Service",
      urlPrefix: "https://pacific-explorer.manta.network/address/",
      registerlink: "https://space.id/tld/3/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.medium,
    {
      color: "#000000",
      icon: "icons/icon-medium.svg",
      label: "Medium",
      urlPrefix: "https://medium.com/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.merlin,
    {
      color: "#5A32A3",
      icon: "icons/icon-merlin.svg",
      label: "Merlin Name Service",
      urlPrefix: "https://scan.merlinchain.io/address/",
      registerlink: "https://space.id/tld/12/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.minds,
    {
      color: "#f7d354",
      icon: "icons/icon-minds.svg",
      label: "Minds",
      urlPrefix: "https://www.minds.com/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.mint,
    {
      color: "#00A57C",
      icon: "icons/icon-mint.svg",
      label: "Mint Name Service",
      urlPrefix: "https://explorer.mintchain.io/address/",
      registerlink: "https://space.id/tld/18/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.mode,
    {
      color: "#E5FD52",
      icon: "icons/icon-mode.svg",
      label: "Mode Name Service",
      urlPrefix: "https://explorer.mode.network/address/",
      registerlink: "https://space.id/tld/6/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.mstdnjp,
    {
      color: "#595aff",
      icon: "icons/icon-mastodon.svg",
      label: "mstdn.jp",
      urlPrefix: "https://mstdn.jp/@",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.mirror,
    {
      color: "#007aff",
      icon: "icons/icon-mirror.svg",
      label: "Mirror",
      urlPrefix: "https://mirror.xyz/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.matters,
    {
      color: "#ffffff",
      icon: "icons/icon-matters.svg",
      label: "Matters",
      urlPrefix: "https://matters.news/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.near,
    {
      color: "#000000",
      icon: "icons/icon-near.svg",
      label: "NEAR Protocol",
      urlPrefix: "https://nearblocks.io/address/",
      registerlink: "https://app.mynearwallet.com/create/?name={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.nextid,
    {
      color: "#000000",
      icon: "icons/icon-nextid.svg",
      label: "Next.ID",
      urlPrefix: "https://web3.bio/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.nostr,
    {
      color: "#5E287D",
      icon: "icons/icon-nostr.svg",
      label: "Nostr",
      urlPrefix: "https://app.coracle.social/",
      ensText: ["nostr"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.opensea,
    {
      color: "#407FDB",
      icon: "icons/icon-opensea.svg",
      label: "OpenSea",
      urlPrefix: "https://opensea.io/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.paragraph,
    {
      color: "#2563eb",
      icon: "icons/icon-paragraph.svg",
      label: "Paragraph",
      urlPrefix: "https://paragraph.xyz/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.philand,
    {
      color: "#8080F7",
      icon: "icons/icon-phi.svg",
      label: "Phi",
      urlPrefix: "https://land.philand.xyz/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.poap,
    {
      color: "#5E58A5",
      icon: "icons/icon-poap.svg",
      label: "POAP",
      urlPrefix: "https://app.poap.xyz/scan/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.polymarket,
    {
      color: "#1652f0",
      icon: "icons/icon-polymarket.svg",
      label: "Polymarket",
      urlPrefix: "https://polymarket.com/profile/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.pumpfun,
    {
      color: "#5fcb87",
      icon: "icons/icon-pumpfun.svg",
      label: "Pump.fun",
      urlPrefix: "https://pump.fun/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.reddit,
    {
      color: "#ff4500",
      icon: "icons/icon-reddit.svg",
      label: "Reddit",
      urlPrefix: "https://www.reddit.com/user/",
      ensText: ["com.reddit"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.scroll,
    {
      color: "#b78544",
      icon: "icons/icon-scroll.svg",
      label: "Scroll",
      urlPrefix: "https://scrollscan.com/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.seekerid,
    {
      color: "#898cff",
      icon: "icons/icon-solana.svg",
      label: "Seeker ID",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.snapshot,
    {
      color: "#ffb503",
      icon: "icons/icon-snapshot.svg",
      label: "Snapshot",
      urlPrefix: "https://snapshot.org/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.sns,
    {
      color: "#6363E1",
      icon: "icons/icon-sns.svg",
      label: "SNS",
      description: "Solana Name Service (SNS and .sol domain)",
      urlPrefix: "https://www.sns.id/search?search=",
      registerlink: "https://www.sns.id/search?search={name}",
      editUrlPrefix: "https://www.sns.id/domain?domain={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.solana,
    {
      color: "#9945FF",
      icon: "icons/icon-solana.svg",
      label: "Solana",
      urlPrefix: "https://solscan.io/address/",
      editUrlPrefix: "https://www.sns.id/domain?domain={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.space_id,
    {
      color: "#71EBAA",
      icon: "icons/icon-spaceid.svg",
      label: "SPACE ID",
      registerlink: "https://space.id/search?query={name}",
      urlPrefix: "https://web3.bio/?s=",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.stacks,
    {
      color: "#725DF6",
      icon: "icons/icon-stacks.svg",
      label: "Stacks",
      urlPrefix: "https://explorer.hiro.so/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.taiko,
    {
      color: "#E81899",
      icon: "icons/icon-taiko.svg",
      label: "DotTaiko Name Service",
      urlPrefix: "https://taikoscan.io/address/",
      registerlink: "https://space.id/tld/16/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.talent,
    {
      color: "#715AE4",
      icon: "icons/icon-talent.svg",
      label: "Talent",
      urlPrefix: "https://app.talentprotocol.com/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.telegram,
    {
      color: "#0088cc",
      icon: "icons/icon-telegram.svg",
      label: "Telegram",
      urlPrefix: "https://t.me/",
      ensText: ["org.telegram", "vnd.telegram", "telegram"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.threads,
    {
      color: "#000000",
      icon: "icons/icon-threads.svg",
      label: "Threads",
      urlPrefix: "https://www.threads.net/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.tiktok,
    {
      color: "#000000",
      icon: "icons/icon-tiktok.svg",
      label: "TikTok",
      urlPrefix: "https://www.tiktok.com/@",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.tomo,
    {
      color: "#DE3A7E",
      icon: "icons/icon-tomo.svg",
      label: "Tomo Name Service",
      registerlink: "https://space.id/tld/10/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.ton,
    {
      color: "#0098EA",
      icon: "icons/icon-ton.svg",
      label: "TON",
      urlPrefix: "https://tonscan.org/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.tron,
    {
      color: "#EB0029",
      icon: "icons/icon-tron.svg",
      label: "Tron",
      urlPrefix: "https://tronscan.org/#/address/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.twitter,
    {
      color: "#000000",
      icon: "icons/icon-x.svg",
      label: "Twitter (X)",
      urlPrefix: "https://x.com/",
      ensText: ["com.twitter", "com.x", "vnd.twitter", "twitter"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.unstoppableDomains,
    {
      color: "#2E65F5",
      icon: "icons/icon-unstoppabledomains.svg",
      label: "Unstoppable Domains",
      description:
        "Unstoppable Domains (.x, .crypto and other Web3 domains), and ud.me Unstoppable Profiles",
      urlPrefix: "https://web3.bio/",
      editUrlPrefix: "https://unstoppabledomains.com/d/{name}",
      registerlink: "https://unstoppabledomains.com/search?searchTerm={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.url,
    {
      color: "#121212",
      icon: "icons/icon-web.svg",
      label: "Website",
      urlPrefix: "",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.v2ex,
    {
      color: "#121212",
      icon: "icons/icon-v2ex.svg",
      label: "V2EX",
      urlPrefix: "https://v2ex.com/member/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.webacy,
    {
      color: "#000000",
      icon: "icons/icon-webacy.svg",
      label: "Webacy",
      urlPrefix: "https://dapp.webacy.com/",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.website,
    {
      color: "#121212",
      icon: "icons/icon-web.svg",
      label: "Website",
      urlPrefix: "",
      ensText: ["url", "website"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.weibo,
    {
      color: "#df2029",
      label: "Weibo",
      urlPrefix: "https://weibo.com/",
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.whatsapp,
    {
      color: "#25d366",
      icon: "icons/icon-whatsapp.svg",
      label: "WhatsApp",
      urlPrefix: "https://wa.me/",
      ensText: ["com.whatsapp", "whatsapp"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.youtube,
    {
      color: "#FF0000",
      icon: "icons/icon-youtube.svg",
      label: "Youtube",
      urlPrefix: "https://www.youtube.com/",
      ensText: ["com.youtube", "youtube"],
      system: PlatformSystem.web2,
    },
  ],
  [
    Platform.zeta,
    {
      color: "#005741",
      icon: "icons/icon-zeta.svg",
      label: "Zeta Name Service",
      urlPrefix: "https://explorer.zetachain.com/address/",
      registerlink: "https://space.id/tld/11/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.zkfair,
    {
      color: "#D43F36",
      icon: "icons/icon-zkfair.svg",
      label: "zkFair",
      urlPrefix: "https://scan.zkfair.io/address/",
      registerlink: "https://space.id/tld/8/domains?query={name}",
      system: PlatformSystem.web3,
    },
  ],
  [
    Platform.zora,
    {
      color: "#000000",
      icon: "icons/icon-zora.svg",
      label: "Zora",
      urlPrefix: "https://zora.co/@",
      system: PlatformSystem.web3,
    },
  ],
]);

/**
 * Get platform data by platform key
 * @public
 */
export const getPlatform = (platform: Platform): Readonly<PlatformType> => {
  return (
    PLATFORM_DATA.get(platform) || { ...DEFAULT_PLATFORM, label: platform }
  );
};
