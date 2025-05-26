"use client";

import {
  useProfile,
  useNS,
  useDomain,
  useUniversalNS,
  useUniversalProfile,
} from "web3bio-profile-kit";

export default function Home() {
  // useProfile
  const { data: profileData, isLoading: profileLoading } =
    useProfile("ens,sujiyan.eth");

  // useNS
  const { data: nsData, isLoading: nsLoading } = useNS("vitalik.eth");

  // useDomain
  const { data: domainData, isLoading: domainLoading } =
    useDomain("yanzzz.eth");

  // useUniversalNS
  const { data: universalNsData, isLoading: universalNsLoading } =
    useUniversalNS("vitalik.eth");

  // useUniversalProfile
  const { data: universalProfileData, isLoading: universalProfileLoading } =
    useUniversalProfile("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Web3.bio Profile Kit Examples</h1>

      {/* useProfile  */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">useProfile</h2>
        {profileLoading && <p>Loading profile...</p>}
        {profileData && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(profileData, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* useNS  */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">useNS</h2>
        {nsLoading && <p>Loading NS data...</p>}
        {nsData && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(nsData, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* useDomain  */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">useDomain</h2>
        {domainLoading && <p>Loading domain data...</p>}
        {domainData && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(domainData, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* useUniversalNS  */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">useUniversalNS</h2>
        {universalNsLoading && <p>Loading universal NS data...</p>}
        {universalNsData && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(universalNsData, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* useUniversalProfile  */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">useUniversalProfile</h2>
        {universalProfileLoading && <p>Loading universal profile data...</p>}
        {universalProfileData && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold">
              {universalProfileData.displayName ||
                universalProfileData.identity}
            </h3>
            {universalProfileData.avatar && (
              <img
                src={universalProfileData.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full my-2"
              />
            )}
            {universalProfileData.description && (
              <p className="text-sm">{universalProfileData.description}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
