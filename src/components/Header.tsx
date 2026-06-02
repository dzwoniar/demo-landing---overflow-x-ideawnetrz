import { Phone, Mail } from 'lucide-react';

interface HeaderProps {
  onCtaclick: () => void;
}

export default function Header({ onCtaclick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#e5dfd5]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Brand Title - Styled elegantly */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#121212] flex items-center justify-center shadow-md shadow-gray-950/10 border border-[#C5A880]/35 hover:border-[#C5A880] transition duration-300">
            {/* Elegant architect graphic of I W in gold */}
            <svg viewBox="0 0 40 40" className="w-7.5 h-7.5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12V28" stroke="#C5A880" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M15 12H9" stroke="#C5A880" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 28H9" stroke="#C5A880" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 12L23 28L28 12L33 28" stroke="#C5A880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight text-[#121212] block leading-none antialiased">
              IDEA WNĘTRZ
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase block mt-1 font-extrabold">
              Inwestor Zastępczy &amp; Wykonawca Generalny
            </span>
          </div>
        </div>

        {/* Contact and Call to Action */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="hidden sm:flex flex-col items-end text-xs space-y-0.5">
            <a
              href="tel:+48500200300"
              className="flex items-center space-x-1.5 font-extrabold font-mono tracking-tight text-[#121212] hover:text-[#C5A880] transition"
              id="header_phone_link"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>+48 500 200 300</span>
            </a>
            <a
              href="mailto:j.dzwoniarski5@gmail.com"
              className="flex items-center space-x-1.5 font-mono text-[11px] text-[#2E2A25]/60 hover:text-[#121212] transition"
              id="header_mail_link"
            >
              <Mail className="w-3 h-3 text-[#C5A880]" />
              <span>j.dzwoniarski5@gmail.com</span>
            </a>
          </div>

          <button
            onClick={onCtaclick}
            className="px-5.5 py-3 rounded-xl bg-[#121212] text-[#FAF8F5] border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-gray-950/10 hover:bg-[#1c1c1f] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition duration-200 cursor-pointer"
            id="header_cta_btn"
          >
            Oblicz Koszt Wykończenia
          </button>
        </div>
      </div>
    </header>
  );
}
