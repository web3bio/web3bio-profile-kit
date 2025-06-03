"use client";
import {
  useProfile,
  useNS,
  useDomain,
  useUniversalNS,
  useUniversalProfile,
  useBatchNS,
  useBatchProfile,
} from "web3bio-profile-kit";
export default function HookTester() {
  // useProfile
  const { data: profileData, isLoading: profileLoading } =
    useProfile("ens,sujiyan.eth");

  // useNS
  const { data: nsData, isLoading: nsLoading } = useNS("vitalik.eth");

  // useDomain
  const { data: domainData, isLoading: domainLoading } = useDomain("nick.eth");

  // useUniversalNS
  const { data: universalNsData, isLoading: universalNsLoading } =
    useUniversalNS("vitalik.eth");

  // useUniversalProfile
  const { data: universalProfileData, isLoading: universalProfileLoading } =
    useUniversalProfile("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");

  // useBatchNS
  const { data: batchNsData, isLoading: batchNsLoading } = useBatchNS([
    "vitalik.eth",
    "brantly.eth",
    "sujiyan.eth",
  ]);

  // useBatchProfile
  const { data: batchProfileData, isLoading: batchProfileLoading } =
    useBatchProfile([
      "ethereum,0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "ens,sujiyan.eth",
    ]);
  const { error: errorMsg, isLoading: errorLoading } = useProfile("nick.eth", {
    apiKey: "invalid key",
  });

  const formatJSON = (data: unknown) => {
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
  };

  return (
    <main>
      <h1>Web3.bio Profile Kit Examples</h1>

      <div>
        {/* useProfile */}
        <section>
          <h2>useProfile</h2>

          {profileLoading && <p>Loading profile...</p>}
          {profileData && formatJSON(profileData)}
        </section>

        {/* useNS */}
        <section>
          <h2>useNS</h2>

          {nsLoading && <p>Loading NS data...</p>}
          {nsData && formatJSON(nsData)}
        </section>

        {/* useDomain */}
        <section>
          <h2>useDomain</h2>

          {domainLoading && <p>Loading domain data...</p>}
          {domainData && formatJSON(domainData)}
        </section>

        {/* useUniversalNS */}
        <section>
          <h2>useUniversalNS</h2>

          {universalNsLoading && <p>Loading universal NS data...</p>}
          {universalNsData && formatJSON(universalNsData)}
        </section>

        {/* useUniversalProfile */}
        <section>
          <h2>useUniversalProfile</h2>

          {universalProfileLoading && <p>Loading universal profile data...</p>}
          {universalProfileData && (
            <div>{formatJSON(universalProfileData)}</div>
          )}
        </section>

        {/* useBatchNS */}
        <section>
          <h2>useBatchNS</h2>

          {batchNsLoading && <p>Loading batch NS data...</p>}
          {batchNsData && formatJSON(batchNsData)}
        </section>

        {/* useBatchProfile */}
        <section>
          <h2>useBatchProfile</h2>

          {batchProfileLoading && <p>Loading batch profile data...</p>}
          {batchProfileData && <div>{formatJSON(batchProfileData)}</div>}
        </section>

        {/* useProfile Error */}
        <section>
          <h2>useProfile Error</h2>

          {errorLoading && <p>Loading profile data...</p>}
          {errorMsg && <div>{errorMsg.message}</div>}
        </section>
      </div>
    </main>
  );
}
