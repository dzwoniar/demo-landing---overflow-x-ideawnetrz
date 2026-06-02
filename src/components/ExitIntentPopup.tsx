import React, { useState, useEffect } from 'react';
import { X, Gift, Send, Star } from 'lucide-react';

interface ExitIntentPopupProps {
  onSubscribeSuccess: (email: string) => void;
}

export default function ExitIntentPopup({ onSubscribeSuccess }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [rodo, setRodo] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('idea_exit_intent_dismissed') === 'true';
    if (isDismissed) return;

    // Timeout trigger: Show after 45 seconds
    const timer = setTimeout(() => {
      triggerPopup();
    }, 45000);

    // Scroll trigger: Show after scrolling past 50%
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight * 0.5;
      if (scrollPos >= threshold) {
        triggerPopup();
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Exit intent trigger: Show when mouse leaves viewport top boundaries
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        triggerPopup();
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const triggerPopup = () => {
    const isDismissed = localStorage.getItem('idea_exit_intent_dismissed') === 'true';
    if (!isDismissed) {
      setIsVisible(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('idea_exit_intent_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setError('Wpisz poprawny adres e-mail');
      return;
    }

    if (!rodo) {
      setError('Musisz zaakceptować zgodę RODO');
      return;
    }

    setError('');
    // Save state
    localStorage.setItem('idea_exit_intent_dismissed', 'true');
    setIsVisible(false);
    onSubscribeSuccess(email);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-md animate-fade-in"
      id="exit_intent_popup_overlay"
    >
      {/* Dark blur overlay */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        id="exit_intent_popup_overlay_bg"
      />

      {/* Main modal */}
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#e5dfd5] z-10 p-8 sm:p-10 transition-all duration-300 animate-in zoom-in-95"
        id="exit_intent_popup_modal"
      >
        {/* Close X */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-950 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer"
          id="exit_intent_close_x_btn"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Present/gift header indicator */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#C5A880]/15 flex items-center justify-center mb-5 shrink-0 border border-[#C5A880]/30 animate-pulse">
            <Gift className="w-7 h-7 text-[#C5A880]" />
          </div>

          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-extrabold px-3 py-1 rounded-full bg-[#C5A880]/10 mb-3 border border-[#C5A880]/20">
            Darmowe opracowanie inżynieryjne
          </span>

          <h3 className="font-display font-bold text-2xl text-[#121212] leading-tight mb-2">
            Zaczekaj! Nie przepłacaj za remont swojego wnętrza.
          </h3>
          <p className="text-xs sm:text-sm text-[#605850] leading-relaxed max-w-md mb-6">
            Pobierz bezpłatny, fachowy poradnik przygotowany przez audytorów Idea Wnętrz:<br />
            <span className="text-white font-bold block mt-2 leading-snug bg-[#C5A880] px-3 py-1.5 rounded text-xs select-none">
              „Wykończenie wnętrz pod klucz — 10 błędów, które kosztują inwestorów średnio 35 000 zł”
            </span>
          </p>
        </div>

        {/* Micro-testimonial inside popup */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#e5dfd5]/65 mb-6 text-center">
          <div className="flex justify-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
            ))}
          </div>
          <p className="text-[11px] text-gray-600 leading-tight italic">
            &quot;Dzięki tej checklistie uniknęłam niepotrzebnego aneksu u podwykonawcy na 12 000 zł i kłopotów z tynkiem!&quot; — Marta S., Wrocław
          </p>
        </div>

        {/* Popup mini-form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="popup_email" className="sr-only">E-mail</label>
            <input
              type="email"
              id="popup_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój adres e-mail"
              className="w-full h-11 px-4 rounded-xl border border-[#e5dfd5] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 focus:outline-none transition text-xs text-center bg-[#FAF8F5] font-semibold"
              required
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="popup_rodo"
              checked={rodo}
              onChange={(e) => setRodo(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#C5A880] focus:ring-[#C5A880] accent-[#C5A880] shrink-0 cursor-pointer"
              required
            />
            <label htmlFor="popup_rodo" className="text-[9px] text-[#605850] leading-snug select-none">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przesłania oraz komunikacji o wycenie od Idea Wnętrz sp. z o.o. zgodnie z RODO.
            </label>
          </div>

          {error && (
            <p className="text-center text-xs text-red-500 font-semibold" id="popup_error_msg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#121212] hover:bg-[#1c1c1f] text-[#FAF8F5] border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
            id="popup_submit_btn"
          >
            <span>Tak, odbierz darmowy poradnik (PDF)</span>
            <Send className="w-4 h-4 text-[#C5A880]" />
          </button>
        </form>

        <button
          onClick={handleClose}
          className="w-full text-center text-[10px] text-gray-400 hover:text-[#121212] transition mt-3.5 underline inline-block"
          id="popup_cancel_link"
        >
          Nie interesuje mnie to, wolę ryzykować nieprzewidziane dopłaty
        </button>
      </div>
    </div>
  );
}
