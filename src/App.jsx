import React, { useState } from 'react';
import InteractiveBackgroundLight from './components/InteractiveBackgroundLight';
import { Mail, Copy, Check, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [offerName, setOfferName] = useState('');
  const [offerEmail, setOfferEmail] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerSent, setOfferSent] = useState(false);

  const emailAddress = 'nurhasan90446@gmail.com';

  const handleCopyEmail = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerEmail) return;
    setOfferSent(true);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-[#fbf8f2] text-[#171614] flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14 max-w-7xl mx-auto">
      {/* Interactive mouse hovering background canvas (default instant speed) */}
      <InteractiveBackgroundLight />

      {/* Tactile paper grain overlay */}
      <div className="paper-grain" />

      {/* Top Header Row (Responsive & properly spaced) */}
      <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-[#171614]/[0.08] pb-5 sm:pb-6 animate-fade-in w-full">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#ea580c]/[0.06] sm:bg-transparent">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ea580c]"></span>
          </span>
          <span className="text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold text-[#171614]">
            Domain Available for Sale
          </span>
        </div>

        {/* Cloudflare Provenance Tag */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#5e5a54] font-medium tracking-wider uppercase">
          <ShieldCheck size={14} className="text-[#ea580c] shrink-0" />
          <span>Purchased &amp; Secured on</span>
          <span className="text-[#171614] font-semibold">Cloudflare</span>
        </div>
      </header>

      {/* Center Main Stage (Generous line spacing, balanced typography) */}
      <main className="relative z-10 my-auto py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center text-center max-w-3xl mx-auto w-full px-2 sm:px-4">
        {/* Category Pill */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ea580c]/25 bg-[#ea580c]/[0.06] text-[#ea580c] text-[11px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 sm:mb-8 md:mb-10">
          <Sparkles size={14} className="shrink-0" />
          <span>Premium 6-Letter Brandable Domain</span>
        </div>

        {/* Grand Headline: Fluid sizing, responsive line height */}
        <h1 className="animate-fade-in delay-100 font-display text-[42px] leading-[1.1] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#171614] mb-6 sm:mb-8 md:mb-10 select-none">
          dharib<span className="text-[#ea580c]">.com</span>
        </h1>

        {/* Clear Sale Message with Proper Line Spacing ("make lines more space") */}
        <p className="animate-fade-in delay-200 text-base sm:text-xl md:text-2xl font-normal text-[#383531] max-w-2xl leading-[1.8] sm:leading-[1.85] md:leading-[2] mb-10 sm:mb-14 px-2">
          This domain is officially <span className="font-semibold text-[#171614] underline decoration-[#ea580c] decoration-2 underline-offset-8">for sale</span>.<br className="hidden sm:inline" /> Open to serious acquisition offers and direct transfer.
        </p>

        {/* Primary Contact Actions */}
        <div className="animate-fade-in delay-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          {/* Main Direct Mailto Button */}
          <a
            href={`mailto:${emailAddress}?subject=Purchase%20Inquiry%20for%20dharib.com`}
            className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center gap-3 bg-[#171614] hover:bg-[#ea580c] text-[#fbf8f2] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm md:text-base tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
          >
            <Mail size={17} className="text-[#fbf8f2] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-semibold">Contact: {emailAddress}</span>
            <ArrowUpRight size={15} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>

          {/* Quick Copy Email Pill */}
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] flex items-center justify-center gap-2 bg-[#f3efe6] hover:bg-[#eae4d5] text-[#171614] border border-[#171614]/10 hover:border-[#ea580c]/50 px-6 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check size={16} className="text-[#ea580c] shrink-0" />
                <span className="text-[#ea580c] font-semibold">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-[#5e5a54] shrink-0" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Instant Offer Button */}
        <div className="animate-fade-in delay-300 mt-8 sm:mt-10">
          <button
            onClick={() => setShowModal(true)}
            className="text-xs sm:text-sm tracking-widest uppercase font-semibold text-[#5e5a54] hover:text-[#ea580c] transition-colors underline decoration-[#171614]/20 hover:decoration-[#ea580c] underline-offset-6 py-2 cursor-pointer"
          >
            Or Submit Quick Offer Online &rarr;
          </button>
        </div>
      </main>

      {/* Bottom Footer Row (Responsive & properly spaced) */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-[#171614]/[0.08] pt-6 sm:pt-7 mt-8 text-xs text-[#5e5a54] text-center sm:text-left animate-fade-in w-full">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span>&copy; {new Date().getFullYear()} dharib.com</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-[#171614] font-medium">Safe Escrow Transfer Available (Escrow.com / Cloudflare)</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${emailAddress}`}
            className="hover:text-[#ea580c] transition-colors font-mono text-xs sm:text-sm"
          >
            {emailAddress}
          </a>
        </div>
      </footer>

      {/* Quick Offer Modal (Fully mobile responsive) */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            setShowModal(false);
            setOfferSent(false);
          }}
        >
          <div
            className="relative w-full max-w-md bg-[#fbf8f2] border border-[#171614]/15 rounded-2xl p-5 sm:p-8 shadow-2xl text-[#171614] max-h-[92dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!offerSent ? (
              <form onSubmit={handleSendOffer} className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#171614]/10 pb-3">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#ea580c] block">
                      Direct Negotiation
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#171614]">
                      Make an Offer for dharib.com
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-[#99948b] hover:text-[#171614] text-2xl font-bold p-1 leading-none cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5e5a54] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={offerEmail}
                    onChange={(e) => setOfferEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-white border border-[#171614]/15 rounded-lg px-3.5 py-3 sm:py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#ea580c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5e5a54] mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white border border-[#171614]/15 rounded-lg px-3.5 py-3 sm:py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#ea580c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5e5a54] mb-1.5">
                    Offer Amount (USD)
                  </label>
                  <input
                    type="text"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="$ USD offer"
                    className="w-full bg-white border border-[#171614]/15 rounded-lg px-3.5 py-3 sm:py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#ea580c] transition-colors"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#171614]/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#5e5a54] hover:text-[#171614] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Offer
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center mx-auto mb-4">
                  <Check size={24} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Offer Logged</h3>
                <p className="text-sm text-[#5e5a54] mb-6">
                  Thank you. Direct notification will be dispatched to <strong>{emailAddress}</strong>.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setOfferSent(false);
                  }}
                  className="px-6 py-2 bg-[#171614] text-white rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
