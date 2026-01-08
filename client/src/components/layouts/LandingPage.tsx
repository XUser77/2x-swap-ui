import HomeNavbar from "../fragments/HomeNavbar";

function LandingPage() {
  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-linear-to-b from-[#193088] via-[#3045AA] to-[#a9b9ff] text-white">
      <img
        src="/stars.png"
        className="absolute top-30 opacity-25 rotate-90 scale-250 md:rotate-0 md:scale-125 z-0"
        alt=""
      />

      <HomeNavbar />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 md:pt-10 text-center ">
        <h1 className="text-2xl md:text-5xl font-semibold mb-4">
          2× exposure to BTC & ETH & RWAs
        </h1>

        <p className="max-w-xs text-xs md:max-w-xl md:text-xl font-semibold text-white/80 mb-10">
          Decentralized, interest-free, profit-sharing protocol.
          <br />
          No forced liquidation.
        </p>

        {/* YouTube Video Embed */}
        <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/cTTQW8vIzs4?si=wWj1yWc5bJZjnnK5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Waitlist */}
        <div className="mt-15 md:mt-6 w-sm md:w-md">
          <p className="flex flex-col mb-4 text-xl md:text-3xl font-semibold">
            Join the waitlist
            <span className="text-md md:text-2xl text-white/70">
              to collect early user points
            </span>
          </p>

          <div className="flex flex-col gap-4 md:gap-6 items-center mt-10 mx-10">
            <input
              type="email"
              placeholder="user@gmail.com"
              className="w-full px-10 py-1.5 md:py-3 rounded-full text-black outline-none bg-white shadow-md"
            />
            <button className="w-full px-6 py-1.5 md:py-3 rounded-full bg-linear-to-b from-[#436FF9] to-[#4C50DF] transition font-medium shadow-md">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default LandingPage;
