import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import FAQAccordion from './components/FAQAccordion';
import InteractiveCalculator from './components/InteractiveCalculator';
import ExitIntentPopup from './components/ExitIntentPopup';
import { TESTIMONIALS, TRUST_STATS, FAQ_ITEMS } from './constants';
import {
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  Mail,
  Star,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Percent,
  Award,
  Phone,
  ArrowDown
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'thank-you'>('landing');
  const [calcData, setCalcData] = useState<{
    metraz: number;
    standard: 'standard' | 'premium' | 'prestige';
    zakres: string;
    start: string;
    name: string;
    email: string;
    phone: string;
    priceEstMin: number;
    priceEstMax: number;
    vatSavings: number;
  } | null>(null);

  const [leadMail, setLeadMail] = useState<string>('');
  const [tripwirePurchased, setTripwirePurchased] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(3600); // 1-hour urgent countdown for the tripwire offer

  const calcRef = useRef<HTMLDivElement | null>(null);

  // Sync URL push states
  useEffect(() => {
    if (view === 'thank-you') {
      window.history.pushState({}, '', '/podziekowanie-wycena');
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [view]);

  // Countdown clock tick
  useEffect(() => {
    if (view !== 'thank-you') return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [view]);

  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToCalculator = () => {
    if (calcRef.current) {
      calcRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCalculatorSubmit = (data: any) => {
    setCalcData(data);
    setLeadMail(data.email);
    setView('thank-you');
    
    // Smooth scroll to top when changing states
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('[Analytics] Lead registered for estimation:', data);
  };

  const handleExitPopupSubscribe = (email: string) => {
    setLeadMail(email);
    // Mimic standard premium submission
    setCalcData({
      metraz: 65,
      standard: 'premium',
      zakres: 'mieszkanie',
      start: '3-miesiace',
      name: 'Użytkownik poradnika',
      email: email,
      phone: '+48 500 200 300',
      priceEstMin: 123500,
      priceEstMax: 149500,
      vatSavings: 22500
    });
    setView('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPLN = (value: number) => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(value);
  };

  if (view === 'thank-you') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pb-16 animate-in fade-in duration-300">
        
        {/* UPPER TRUST BAR */}
        <div className="bg-[#121212] text-[#FAF8F5] text-xs py-3.5 px-4 text-center border-b border-[#C5A880]/20">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 flex-wrap text-[11px] font-sans antialiased">
            <span className="font-mono tracking-widest uppercase font-extrabold text-[9px] bg-[#C5A880] text-[#121212] px-2 py-0.5 rounded mr-2">
              POTWIERDZENIE ZGŁOSZENIA
            </span>
            <span className="font-semibold text-gray-200">
              Twoja szacunkowa wycena ryczałtowa została wygenerowana i wysłana na podany adres e-mail.
            </span>
          </div>
        </div>

        {/* HEADER */}
        <div className="bg-white border-b border-[#e5dfd5]/60 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center border border-[#C5A880]/30 shadow-sm">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12V28" stroke="#C5A880" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M15 12H9" stroke="#C5A880" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 28H9" stroke="#C5A880" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 12L23 28L28 12L33 28" stroke="#C5A880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-extrabold text-base tracking-tight text-gray-950 block leading-none">
                  IDEA WNĘTRZ
                </span>
                <span className="text-[8px] font-mono tracking-widest text-[#C5A880] block uppercase font-extrabold mt-1">
                  Inwestor Zastępczy &amp; Wykonawca Generalny
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                setView('landing');
                setTripwirePurchased(false);
              }}
              className="text-xs font-mono font-bold text-[#C5A880] hover:text-gray-950 transition border-b border-transparent hover:border-gray-900 cursor-pointer"
              id="back_to_landing_btn"
            >
              ← Powrót do kalkulatora
            </button>
          </div>
        </div>

        {/* NOTIFICATION HERO */}
        <div className="bg-white border-b border-[#e5dfd5]/60 py-12 md:py-16 text-center shadow-xs">
          <div className="max-w-3xl mx-auto px-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shrink-0">
              <Check className="w-7 h-7 text-emerald-600 stroke-[3px]" />
            </div>

            <h1 className="font-display font-bold text-3xl md:text-5xl text-gray-950 tracking-tight leading-tight mb-4">
              Twoje dane zostały pomyślnie przesłane!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Szczegółowy arkusz kalkulacyjny szacowanych kosztów materiałowo-budowlanych dla lokalu o powierzchni <strong className="text-gray-950">{calcData?.metraz || 65} m²</strong> został spakowany i wysłany na podany e-mail:<br />
              <strong className="text-gray-950 text-sm md:text-base font-semibold block mt-1.5">{leadMail || 'Twój adres e-mail'}</strong>
              <span className="block text-xs text-gray-400 mt-2">
                Wiadomość powinna dotrzeć w ciągu 2 minut (zalecamy sprawdzić zakładki <strong>Oferty</strong> oraz folder <strong>SPAM</strong>).
              </span>
            </p>

            <div className="inline-flex flex-col items-center">
              <a
                href="#poradnik"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Rozpoczynam darmowe pobieranie szacunkowego planu kosztów (PDF)...');
                }}
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl bg-[#121212] hover:bg-[#1c1c1f] text-white border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-gray-200 transition duration-200"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>Pobierz natychmiast planowany kosztorys (PDF)</span>
              </a>
              <span className="text-[10px] text-gray-400 mt-2 font-mono">
                Pobieranie bezpośrednie bez opłaty · 2.4 MB
              </span>
            </div>
          </div>
        </div>

        {/* DETAILED ESTIMATE ANALYSIS CARD */}
        <div className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
          
          <div className="bg-white rounded-3xl border border-[#e5dfd5] shadow-lg p-6 sm:p-10 space-y-6">
            <h3 className="font-display font-bold text-xl text-gray-950 border-b border-[#e5dfd5]/60 pb-4 flex items-center justify-between">
              <span>Zestawienie szacunkowe dla Twojej inwestycji</span>
              <span className="text-xs font-mono font-bold text-emerald-600 px-2.5 py-1 bg-emerald-50 rounded-lg">Status: Wygenerowano</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#e5dfd5]/40">
                <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold mb-0.5">Metraż:</span>
                <span className="font-display font-extrabold text-base text-gray-950">{calcData?.metraz || 65} m²</span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#e5dfd5]/40">
                <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold mb-0.5">Klasa wykończenia:</span>
                <span className="font-display font-extrabold text-base text-[#C5A880] capitalize">{calcData?.standard || 'Premium'}</span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#e5dfd5]/40">
                <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold mb-0.5">Zakres wykończenia:</span>
                <span className="font-display font-extrabold text-xs text-gray-950 leading-tight block truncate">
                  {calcData?.zakres === 'mieszkanie' && 'Mieszkanie pod klucz'}
                  {calcData?.zakres === 'dom' && 'Dom jednorodzinny'}
                  {calcData?.zakres === 'komercja' && 'Lokal komercyjny / Fit-out'}
                  {calcData?.zakres === 'wybrane' && 'Tylko wybrane prace'}
                </span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#e5dfd5]/40">
                <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold mb-0.5">Czas realizacji:</span>
                <span className="font-display font-extrabold text-base text-emerald-600">60 dni roboczych</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl border border-[#e5dfd5] space-y-1">
                <span className="text-[9px] font-mono text-gray-400 block uppercase font-bold tracking-wider">
                  SZACUNKOWY KOSZT MATERIAŁÓW I ROBOCIZNY:
                </span>
                <span className="font-display font-bold text-2xl text-gray-950 block">
                  {formatPLN(calcData?.priceEstMin || 123500)} – {formatPLN(calcData?.priceEstMax || 149500)}
                </span>
                <span className="text-xs text-gray-400 block leading-tight pt-1">
                  *Podana kwota zawiera kompleksowe wykończenie rzemieślnicze z materiałem. Precyzyjną niezmienną cenę gwarantujemy po rzutach.
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-500/[0.03] space-y-1">
                <span className="text-[9px] font-mono text-emerald-700 block uppercase font-bold tracking-wider">
                  TWOJA OSZCZĘDNOŚĆ NA PODATKU VAT (15%):
                </span>
                <span className="font-display font-bold text-2xl text-emerald-600 block">
                  {formatPLN(calcData?.vatSavings || 22500)}
                </span>
                <span className="text-xs text-emerald-800 block leading-tight pt-1">
                  Wspólne zakupy z robocizną w Idea Wnętrz oznaczają preferencyjną stawkę VAT 8% zamiast 23% dla inwestorów.
                </span>
              </div>
            </div>
          </div>

          {/* SELL LIKE CRAZY REVOLTING TRIPWIRE OFFER */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl border border-amber-200 shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/50 pb-4">
                <span className="px-3.5 py-1 text-[9px] font-mono tracking-widest font-extrabold uppercase bg-amber-500 text-gray-950 rounded-full">
                  LIMITOWANA OFERTA JEDNORAZOWA
                </span>
                <span className="flex items-center space-x-1.5 text-xs text-amber-800 font-mono font-bold">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Wygasa za:</span>
                  <span className="text-amber-950 font-black tracking-wider text-sm">{formatCooldown(cooldown)}</span>
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-amber-950 tracking-tight leading-tight">
                  Zanim sprawdzisz skrzynkę: Indywidualna Konsultacja Rzutów i Zmian Lokatorskich z Kierownikiem Projektu
                </h2>
                <p className="text-sm text-amber-900 leading-relaxed font-sans font-medium">
                  Sama kalkulacja daje świetne rzędy wielkości, ale prawdziwym przełomem jest indywidualna faza diagnostyczna. Prześlij nam rzuty swojego mieszkania lub domu. Podczas 45-minutowej indywidualnej wideokonsultacji z założycielem Idea Wnętrz, <strong>Jackiem Dzwoniarskim</strong>, przeanalizujemy Twoje plany i wskażemy błędy układów funkcjonalnych, dając oszczędności na poziomie nawet kilkunastu tysięcy złotych przed wejściem ekipy remontowej.
                </p>
              </div>

              {/* Benefits checklist */}
              <div className="space-y-3.5 bg-white/70 p-4.5 rounded-2xl border border-amber-200/40">
                <div className="flex items-start space-x-3 text-amber-950">
                  <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center shrink-0 text-amber-900 font-extrabold text-xs mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm block">Analiza zmian deweloperskich i lokatorskich</strong>
                    <p className="text-xs text-amber-900/80 leading-normal">Wskażemy, które ścianki działowe przestawić i jak zoptymalizować punkty elektryczne zanim wejdzie ekipa, oszczędzając do 15 000 zł poprawek na budowie.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-amber-950">
                  <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center shrink-0 text-amber-900 font-extrabold text-xs mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm block">Weryfikacja instalacji i rzetelności dewelopera</strong>
                    <p className="text-xs text-amber-900/80 leading-normal">Ocenimy, czy tynki i instalacje nadają się do bezpośredniego montażu, czy wymagają korygowania kosztownego.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-amber-950">
                  <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center shrink-0 text-amber-900 font-extrabold text-xs mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs sm:text-sm block">Spokój ducha i rzetelny, stały kosztorys</strong>
                    <p className="text-xs text-amber-900/80 leading-normal">Po rozmowie otrzymasz spersonalizowany, stały budżet ryczałtowy gwarantowany na piśmie.</p>
                  </div>
                </div>
              </div>

              {/* Price comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-t border-amber-200/60 pt-6">
                <div>
                  <span className="text-[10px] text-amber-800 uppercase font-bold block mb-1 font-mono">Cena standardowa:</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-mono text-gray-400 line-through text-lg font-medium">297 zł</span>
                    <span className="font-display font-extrabold text-amber-950 text-3xl">49 zł</span>
                    <span className="text-xs text-emerald-700 font-extrabold italic bg-emerald-50 px-1.5 py-0.5 rounded">Oszczędzasz 248 zł!</span>
                  </div>
                  <span className="text-[10px] text-amber-700 block mt-1.5">
                    *Jednorazowa oferta, zamykając tę stronę tracisz dostęp do ceny preferencyjnej.
                  </span>
                </div>

                <div>
                  {tripwirePurchased ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                      <p className="text-sm font-bold text-emerald-900 flex items-center justify-center space-x-1.5">
                        <Check className="w-5 h-5 text-emerald-600 stroke-[3px]" />
                        <span>Konsultacja Zarezerwowana!</span>
                      </p>
                      <p className="text-[10px] text-emerald-800 leading-snug mt-1">
                        Dziękujemy. Skontaktujemy się z Tobą telefonicznie w ciągu 24h, aby ustalić dogodny termin i poprosić o rzuty.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setTripwirePurchased(true)}
                      className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 font-display font-bold text-gray-950 text-sm shadow-md transition transform active:scale-95 duration-100 cursor-pointer flex items-center justify-center space-x-2"
                      id="tripwire_purchase_btn"
                    >
                      <span>Chcę zamówić konsultację rzutów za 49 zł</span>
                      <Sparkles className="w-4 h-4 fill-gray-950 text-gray-950" />
                    </button>
                  )}
                </div>
              </div>

              {/* SLA compliance footer */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-[10.5px] text-amber-900/70 border-t border-amber-200/30 pt-4 leading-relaxed">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-4.5 h-4.5 text-amber-700 shrink-0" />
                  <span>30-dniowa gwarancja satysfakcji. Jeśli nie wskażemy oszczędności na rzutach rzędu min. 2000 zł, zwracamy 49 zł.</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t border-[#e5dfd5]/60 max-w-7xl mx-auto px-4 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Idea Wnętrz Sp. z o.o. Wszystkie prawa zastrzeżone.</p>
          <p className="mt-1">
            Polityka Prywatności i Pliki Cookies · RODO · Kontakt: <a href="mailto:j.dzwoniarski5@gmail.com" className="underline">j.dzwoniarski5@gmail.com</a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] selection:bg-[#C5A880] selection:text-white min-h-screen flex flex-col justify-between">
      
      {/* ABOVE-HEADER TRUST STRIP */}
      <div className="bg-[#121212] text-[#FAF8F5] text-xs py-2.5 px-4 text-center border-b border-[#C5A880]/20 font-sans antialiased">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3 flex-wrap">
          <span className="font-mono tracking-widest uppercase font-extrabold text-[8px] bg-[#C5A880] text-[#121212] px-2 py-0.5 rounded leading-none inline-block">
            ZAUFANIE &amp; TRANSPARENTNOŚĆ
          </span>
          <span className="font-semibold text-gray-200">
            Inwestor Zastępczy i Wykonawca Generalny · Polska · Spółka z o.o.
          </span>
        </div>
      </div>

      <Header onCtaclick={scrollToCalculator} />

      {/* STICKY ON-PAGE NAVIGATION */}
      <div className="bg-white border-b border-[#e5dfd5]/60 py-3 sticky top-20 z-30 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-gray-400">
            NAWIGACJA:
          </span>
          <div className="flex space-x-6 text-xs font-bold text-gray-500">
            <a href="#problem" className="hover:text-gray-950 transition-colors">1. Dlaczego kłócimy się o fakturę?</a>
            <a href="#rozwiazanie" className="hover:text-gray-950 transition-colors">2. Podwójna Rola pod klucz</a>
            <a href="#kalkulator" className="hover:text-gray-950 font-extrabold text-[#C5A880] transition-colors">3. Kalkulator Wyceny</a>
            <a href="#gwarancje" className="hover:text-gray-950 transition-colors">4. Gwarancje na Piśmie</a>
            <a href="#opinie" className="hover:text-gray-950 transition-colors">5. Opinie Klientów</a>
            <a href="#obiekcje" className="hover:text-gray-950 transition-colors">6. Najczęstsze pytania</a>
          </div>
          <button
            onClick={scrollToCalculator}
            className="text-[11px] font-mono font-bold text-[#C5A880] hover:text-[#cca262] transition flex items-center space-x-1 cursor-pointer"
          >
            <span>Oblicz Koszt Projektu</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A880] animate-bounce ml-0.5" />
          </button>
        </div>
      </div>

      {/* HERO SECTION - Twój remont. Twój budżet. Zero niespodzianek na fakturze. */}
      <section className="relative pt-12 pb-24 border-b border-[#e5dfd5]/60 bg-gradient-to-b from-white to-[#FAF8F5]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 mr-auto select-none">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] font-extrabold uppercase leading-none">
                  GWARANTOWANY KOSZTORYS BEZ DOPŁAT
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-[52px] text-gray-950 tracking-tight leading-[1.08] antialiased">
                  Twój remont. Twój budżet. <span className="highlight-yellow">Zero niespodzianek</span> na fakturze.
                </h1>
                
                <h2 className="text-base sm:text-lg font-sans text-[#605850] leading-relaxed max-w-2xl font-medium pt-1">
                  Większość firm wykończeniowych przekracza ustalony kosztorys o 15–30%. My podpisujemy gwarancję niezmienności ceny — zanim zaczniemy pierwszą pracę.
                </h2>
              </div>

              {/* Bullet points benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div className="flex items-start space-x-3 text-sm p-4 bg-white rounded-2xl border border-[#e5dfd5]/50 shadow-xs hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A880]/20 text-[#C5A880]">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-gray-950 font-bold block">VAT 8% zamiast 23%</span>
                    <p className="text-xs text-gray-440 mt-0.5 leading-snug">Na robociznę wraz z materiałami, co oznacza realną oszczędność 15% budżetu.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm p-4 bg-white rounded-2xl border border-[#e5dfd5]/50 shadow-xs hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A880]/20 text-[#C5A880]">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-gray-950 font-bold block">0% odchyleń cenowych</span>
                    <p className="text-xs text-gray-440 mt-0.5 leading-snug">Cena ryczałtowa gwarantowana na piśmie pod rygorem pokrycia różnic przez nas.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm p-4 bg-white rounded-2xl border border-[#e5dfd5]/50 shadow-xs hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A880]/20 text-[#C5A880]">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-gray-950 font-bold block">Koniec z jeżdżeniem na budowę</span>
                    <p className="text-xs text-gray-440 mt-0.5 leading-snug">W każdy piątek otrzymujesz na telefon szczegółowy cotygodniowy fotoreportaż.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm p-4 bg-white rounded-2xl border border-[#e5dfd5]/50 shadow-xs hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A880]/20 text-[#C5A880]">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-gray-950 font-bold block">Harmonogram na piśmie</span>
                    <p className="text-xs text-gray-440 mt-0.5 leading-snug">Wszystkie prace zakończymy maksymalnie w 60 dni roboczych pod rygorem kar.</p>
                  </div>
                </div>
              </div>

              {/* Hero CTA Button and status clock */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-5 pt-2">
                <button
                  onClick={scrollToCalculator}
                  className="px-8 h-14 rounded-xl bg-[#121212] hover:bg-[#1c1c1f] text-white border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-[#faf8f5] text-xs sm:text-xs tracking-wider uppercase shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
                  id="hero_cta_submit_btn"
                >
                  <span>Sprawdź koszt swojego projektu — bezpłatny kalkulator</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>

                <div className="text-center sm:text-left flex items-center justify-center sm:justify-start space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-ping" />
                  <div>
                    <span className="text-[9.5px] font-mono font-extrabold text-[#C5A880] uppercase block leading-none tracking-wider">
                      Wycena na e-mail w 2 minuty
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5 font-sans leading-none">
                      Szacunek orientacyjny od razu. Bez zobowiązań.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Interactive/Static Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-[#FAF8F5] rounded-3xl blur-2xl transform rotate-3" />
              <div className="relative bg-white rounded-3xl border border-[#e5dfd5] shadow-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200"
                  alt="Luksusowo wykończone nowoczesne wnętrze mieszkania pod klucz przez Idea Wnętrz"
                  className="w-full h-80 sm:h-120 object-cover"
                />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#121212]/95 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#C5A880] font-extrabold block uppercase mb-1">
                      REALIZACJA PREMIUM — APARTAMENTY
                    </span>
                    <span className="font-display font-medium text-sm tracking-tight text-white block">
                      Kompleksowe wykończenia pod klucz
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 leading-none">
                      Prywatny Inwestor | Warszawa (Wola)
                    </span>
                  </div>
                  
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-[#C5A880]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM (Zainteresowanie) */}
      <section id="problem" className="py-20 bg-white border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Trudna rzeczywistość deweloperska
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
              Dlaczego tak wiele remontów kończy się kłótnią o fakturę?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left detailed story column */}
            <div className="lg:col-span-7 space-y-6 text-[#605850] leading-relaxed text-sm">
              <p>
                Zaczynasz z podpisaną umową i ceną, która brzmi rozsądnie. Pierwsze dwa tygodnie: wszystko idzie zgodnie z planem. Ekipa pojawia się punktualnie, prace ruszyły, jesteś spokojny.
              </p>
              <p>
                Potem pojawia się „drobna zmiana zakresu”. Potem aneks, bo materiały podrożały. Potem drugi aneks. Potem cisza — telefon wykonawcy milczy i nie otrzymujesz odpowiedzi przez tydzień.
              </p>
              <p className="border-l-2 border-[#C5A880] pl-4 font-serif italic text-base text-gray-950/90 my-6">
                &quot;Kiedy w końcu dostajesz klucze — o ile dostajesz je w terminie — na biurku czeka faktura końcowa, której się zupełnie nie spodziewałeś. To nie jest wyjątek na rynku. To reguła.&quot;
              </p>
              
              <div className="pt-4">
                <span className="text-xs font-mono font-extrabold text-[#C5A880] uppercase block mb-1">
                   STAWKA O CO TOCHY?
                </span>
                <p className="text-xs text-gray-500">
                  Nie ma w tym złej woli. To prosty efekt struktury rynku. Tradycyjna ekipa remontowa zyskuje, gdy pojawia się problem budowlany. Im więcej „problemów lub robót dodatkowych”, tym większy mają zysk. W Idea Wnętrz postanowiliśmy to odwrócić.
                </p>
              </div>
            </div>

            {/* Right statistics visual column */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#e5dfd5]/60">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase block font-extrabold mb-1">TRADYCYJNY IMPORT RYZYKA</span>
                <div className="flex items-baseline space-x-1.5 mb-2">
                  <span className="font-display font-medium text-3xl text-gray-950">15% – 30%</span>
                  <span className="text-xs text-red-650 font-bold bg-red-50 px-1 py-0.2 rounded font-mono">- Przekroczenia</span>
                </div>
                <p className="text-xs text-gray-500 leading-normal">
                  Przeciętne odchylenie ostatecznych kosztów od budżetu wstępnego w tradycyjnych, rozproszonych modelach wykończeniowych.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#e5dfd5]/60">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase block font-extrabold mb-1">REALNY CZAS REALIZACJI</span>
                <div className="flex items-baseline space-x-1.5 mb-2">
                  <span className="font-display font-medium text-3xl text-gray-950">90+ dni opóźnienia</span>
                </div>
                <p className="text-xs text-gray-500 leading-normal">
                  Dotyczy masowych wykonawców (podczas gdy KODO rzadko przekracza, RedNet na bazie analiz miewa ponad 90-dniowe przestoje i brak komunikacji).
                </p>
              </div>

              <div className="bg-red-500/[0.04] p-5 rounded-2xl border border-red-100 flex items-start space-x-3.5">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs text-red-900 block font-bold leading-none mb-1">CAŁKOWITY BRAK KONTAKTU</strong>
                  <p className="text-[11px] text-red-950/80 leading-normal">
                    Najczęstszy, karygodny grzech mniejszych, nierejestrowanych ekip budowlanych po zapłaceniu im ostatniej transzy. Z nami kontrakt i SLA chronią Cię do ostatniego dnia.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: SOLUTION (Pragnienie) */}
      <section id="rozwiazanie" className="py-24 bg-[#FAF8F5] border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Podwójna rola, brak barier
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
              Jeden podmiot. Dwie role. Jeden punkt odpowiedzialności.
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Dlaczego rola Inwestora Zastępczego i Wykonawcy Generalnego pod jednym dachem to jedyna droga do świętego spokoju?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left explanation column */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e5dfd5]/70 flex flex-col justify-between">
              <div className="space-y-6 text-sm text-[#605850] leading-relaxed">
                <p>
                  W tradycyjnym modelu to Ty musisz koordynować architekta, dostawców i ekipę budowlaną. Kiedy coś idzie nie tak, każdy zrzuca winę na drugiego. Architekt twierdzi, że ekipa źle odczytała rzuty. Ekipa twierdzi, że rzuty były niewykonalne. Dostawca spóźnia się z dostawą rzemiosła, a Ty ponosisz koszty przestoju.
                </p>
                <div className="p-4 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 text-gray-900 font-medium">
                  <strong>W Idea Wnętrz robimy obie te rzeczy jednocześnie:</strong>
                  <ul className="space-y-2 mt-3 text-xs text-gray-700">
                    <li className="flex items-start space-x-1.5">
                      <span className="text-[#C5A880] font-bold">•</span>
                      <span>Jako Twój <strong>Inwestor Zastępczy</strong> dbamy o to, by materiały były kupione w zoptymalizowanych cenach bezpośrednio u sprawdzonych krajowych producentów.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-[#C5A880] font-bold">•</span>
                      <span>Jako <strong>Wykonawca Generalny</strong> przejmujemy pełną prawność za robotę, koordynację architektów oraz ostateczną rzetelną jakość pracy na budowie.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* B2B Segment block */}
              <div className="mt-8 pt-6 border-t border-gray-150/50">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] font-extrabold uppercase block mb-1">
                   DLA KLIENTÓW B2B: MODEL OPEN BOOK
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Dla firm, projektów biurowych (fit-out) oraz inwestorów instytucjonalnych oferujemy rygorystyczne rozliczenie w formule <strong>Open Book</strong>. Widzisz każdą fakturę od dostawców z zerową marżą Idea Wnętrz. Nasze wynagrodzenie to stała i przejrzysta opłata za zarządzanie projektem (Project Management Fee), co zapewnia 100% przejrzystości dla CFO i audytorów.
                </p>
              </div>
            </div>

            {/* Right benefits dashboard list */}
            <div className="space-y-4 flex flex-col justify-between">
              
              {[
                { title: 'VAT 8% zamiast 23%', desc: 'Kompleksowy pakiet materiałów z montażem w ramach jednej umowy uprawnia Cię do preferencyjnej stawki VAT 8%. Różnica 15% zostaje u Ciebie.' },
                { title: 'Budżet wpisany w umowę i gwarantowany', desc: 'Po zatwierdzeniu projektu i wyborze standardu, cena jest stała i zapisana w kontrakcie. My bierzemy ryzyko wzrostów cen materiałów.' },
                { title: 'Cotygodniowy raport fotograficzny', desc: 'Nie musisz marnować czasu na jazdy. W każdy piątek nasz kierownik wysyła obszerną dokumentację fotograficzną stanu robót.' },
                { title: 'Jeden numer telefonu', desc: 'Otrzymujesz wsparcie od jednego dedykowanego menedżera kontraktu, który koordynuje zakupy, dostawy, ekipy i instalatorów.' },
                { title: 'Gwarantowany termin na piśmie (60 dni)', desc: 'Wykończenie mieszkania pod klucz zamykamy maksymalnie w limit realizacyjny: 60 dni roboczych. Zabezpieczone karami umownymi.' }
              ].map((benefit, i) => (
                <div key={i} className="bg-white p-5 rounded-2.5xl border border-[#e5dfd5]/60 flex items-start space-x-4 shadow-xs">
                  <div className="w-6 animate-pulse h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-950 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{benefit.desc}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: INTERACTIVE ESTIMATOR DISPLAY */}
      <section id="kalkulator" className="py-24 bg-white border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Krok 1 Lejka — Bez opłat
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
               Ile realnie kosztuje wykończenie Twojego mieszkania lub domu?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2.5 leading-relaxed max-w-2xl mx-auto">
               Nie musisz umawiać się na spotkanie konsumujące czas ani wysyłać rzutów, żeby poznać rzędy wielkości finansowych. Wpisz dane — szacunkową wycenę dostajesz na e-mail od razu.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <InteractiveCalculator onSubmitSuccess={handleCalculatorSubmit} initialRef={calcRef} />
          </div>

        </div>
      </section>

      {/* SECTION 5: GWARANCJE (Prawne) */}
      <section id="gwarancje" className="py-24 bg-white border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Święty spokój gwarantowany notarialnie
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
               Co dostajesz na piśmie — zanim zaczniemy
            </h2>
            <p className="text-sm text-gray-500 mt-2">
               Bezpieczeństwo podpisane pod rygorem pełnej odpowiedzialności odszkodowawczej
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6.5 sm:p-8 bg-white border border-[#e5dfd5] rounded-3xl space-y-4 flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center font-bold text-lg font-mono">
                  $
                </div>
                <h3 className="font-display font-bold text-gray-950 text-base leading-tight">
                  Gwarancja 0% odchylenia budżetu
                </h3>
                <p className="text-xs sm:text-xs text-gray-500 leading-relaxed font-sans">
                  Jeśli pomylimy się w naszej wycenie ryczałtowej o choćby jedną złotówkę, całą brakującą kwotę pokrywamy z własnych środków obrotowych. Cena określona na umowie jest ostateczna i nie ulega zmianie.
                </p>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] block pt-3 border-t border-gray-100 font-extrabold uppercase">
                PEWNOŚĆ FINANSOWA
              </span>
            </div>

            <div className="p-6.5 sm:p-8 bg-white border border-[#e5dfd5] rounded-3xl space-y-4 flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-gray-950 text-base leading-tight">
                  Gwarancja terminu — 60 dni roboczych
                </h3>
                <p className="text-xs sm:text-xs text-gray-500 leading-relaxed font-sans">
                  Za każdy dzień opóźnienia oddania podpisanego standardu wypłacamy umowną karę finansową określoną w kontrakcie. My dbamy o Twój czas i harmonogram prac wykończeniowych.
                </p>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] block pt-3 border-t border-gray-100 font-extrabold uppercase">
                RZETELNE PROWADZENIE
              </span>
            </div>

            <div className="p-6.5 sm:p-8 bg-white border border-[#e5dfd5] rounded-3xl space-y-4 flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#C5A880] border border-[#e5dfd5]/60 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-gray-950 text-base leading-tight">
                  Raport co tydzień — bez proszenia
                </h3>
                <p className="text-xs sm:text-xs text-gray-500 leading-relaxed font-sans">
                  W każdy piątek do godziny 17:00 otrzymujesz profesjonalną dokumentację fotograficzą na e-mail o stanie budowy, wraz z najbliższą listą zakupów, bez konieczności pytania.
                </p>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#C5A880] block pt-3 border-t border-gray-100 font-extrabold uppercase">
                PEŁNA TRANSPARENTNOŚĆ
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: SOCIAL PROOF */}
      <section id="opinie" className="py-24 bg-[#FAF8F5] border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Mierzalne zadowolenie na budowach
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
               Co o współpracy z nami mówią inwestorzy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                className="bg-white p-6.5 sm:p-8 rounded-3xl border border-[#e5dfd5] flex flex-col justify-between hover:shadow-lg transition"
                id={`testimonial_card_${i}`}
              >
                <div>
                  <div className="flex items-center space-x-1 text-[#C5A880] mb-4 select-none">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed italic mb-6">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-gray-150/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <span className="font-display font-bold text-xs sm:text-sm text-gray-950 block leading-tight">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-gray-450 block mt-0.5 leading-none">
                      {t.role}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest font-extrabold text-[#C5A880] block mt-1 uppercase">
                       {t.industry} | {t.metric}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust values strip */}
          <div className="mt-16 pt-10 border-t border-[#e5dfd5]/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_STATS.map((s, i) => (
              <div key={i}>
                <span className="font-display font-bold text-3xl text-gray-950 block leading-none">{s.value}</span>
                <span className="text-xs text-gray-400 block mt-2">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] text-gray-400 mt-6 leading-tight max-w-sm mx-auto">
            *Dane historyczne w oparciu o ankiety zadowolenia na ukończenie inwestycji 2018–2026.
          </p>

        </div>
      </section>

      {/* SECTION 7: FOR WHOM (Kwalifikacja) */}
      <section className="py-24 bg-white border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Kwalifikacja współpracy
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
               Pracujemy z dwoma typami inwestorów
            </h2>
            <p className="text-sm text-gray-500 mt-2">
               Kompleksowa obsługa wykończeniowa dla osób prywatnych oraz stabilnego biznesu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Private client column */}
            <div className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#e5dfd5] rounded-3xl space-y-5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C5A880] border border-orange-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-xl">
                1. Inwestorzy Prywatni (B2C)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Kupujesz swoje wymarzone mieszkanie lub budujesz dom wolnostojący o powierzchni pow. 45 m². Chcesz wprowadzić się w umówionym terminie, bez marnowania setek godzin na rozmowy z rzemieślnikami, pilnowanie dostaw płytek czy kłótnie o jakość gładzi. Zależy Ci na stałym ryczałcie i oszczędności 15% budżetu dzięki usłudze preferencyjnego podatku VAT 8% na wszystko.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-950 font-bold">
                <span>✓ Wykończenie mieszkania i domu pod klucz</span>
              </div>
            </div>

            {/* Commercial client column */}
            <div className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#e5dfd5] rounded-3xl space-y-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <Percent className="w-4.5 h-4.5 stroke-[2.5px]" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-xl">
                2. Inwestorzy Komercyjni (B2B)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Planujesz fit-out nowego biura komercyjnego, kliniki medycznej, boutique hotelu lub lokalu usługowego. Oczekujesz bezwzględnej rzetelności, fakturowania Open Book z wglądem w zakupy subkontrahentów, twardej polisy ubezpieczeniowej oraz bezkompromisowej realizacji harmonogramów. Twoja firma ma stabilne finansowanie, a my bierzemy na siebie odbiór budowlany i kierownictwo zespołu.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-950 font-bold">
                <span>✓ Rozliczenie Open Book z gwarancją stałej opłaty</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: FAQ CLIENT WORKFLOW */}
      <section id="obiekcje" className="py-24 bg-[#FAF8F5] border-b border-[#e5dfd5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A880] uppercase block mb-3">
              Merytoryczna pewność (FAQ)
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-gray-950 tracking-tight leading-tight">
               Najczęstsze pytania inwestorów budowlanych
            </h2>
          </div>

          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION (CTA) */}
      <section className="py-24 bg-white border-b border-[#e5dfd5]/60 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-7">
          <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 flex items-center justify-center mx-auto border border-[#C5A880]/30 animate-pulse">
            <Award className="w-6 h-6 text-[#C5A880]" />
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-950 tracking-tight leading-tight max-w-xl mx-auto">
            Gotowy zobaczyć, ile realnie kosztuje Twój projekt?
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Kalkulator jest bezpłatny. Szacunkowa wycena trafia na Twój e-mail w mniej niż 2 minuty. Przekonaj się, jak stałe ceny chronią budżet Twojej inwestycji.
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToCalculator}
              className="px-10 h-14 rounded-xl bg-[#121212] hover:bg-[#1c1c1f] text-[#FAF8F5] border border-transparent hover:border-[#C5A880] hover:text-[#C5A880] font-sans font-bold text-xs uppercase tracking-widest transition duration-150 active:scale-98 flex items-center justify-center space-x-2.5 mx-auto cursor-pointer shadow-lg"
              id="footer_cta_submit_btn"
            >
              <span>Oblicz koszt swojego wykończenia</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
            <span className="text-xs italic text-gray-400 mt-3 block font-mono">
              Obsługujemy lokale i domy powyżej 45 m². Szybki, rzetelny i bezpłatny szacunek kosztów.
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER GENERAL COMPLIANT COMPOSITION */}
      <footer className="bg-white py-14 border-t border-[#e5dfd5]/40 text-center text-xs text-gray-400 leading-relaxed font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-2 text-gray-500 font-bold mb-2">
            <span>Idea Wnętrz sp. z o.o.</span>
            <span>·</span>
            <span>Adresy oddziałów: Warszawa (ul. Grzybowska 5A, 00-132), Gdańsk, Wrocław</span>
            <span>·</span>
            <span>NIP: 5252839210</span>
            <span>·</span>
            <span>KRS: 0000892019</span>
          </div>

          <p className="max-w-2xl mx-auto leading-relaxed text-[11px] text-gray-400 font-sans">
             Niniejsza strona lądowania ma charakter wyłącznie informacyjny i nie stanowi umowy handlowej w świetle przepisów Kodeksu Cywilnego. Kompleksowe kalkulacje deweloperskie, dobór standardów i twarde postanowienia harmonogramu SLA są każdorazowo załączane do oficjalnego kontraktu z firmą Idea Wnętrz.
          </p>

          <p className="pt-4 border-t border-gray-100 max-w-xs mx-auto text-[10px] font-mono leading-relaxed">
            © {new Date().getFullYear()} Idea Wnętrz. Wszystkie prawa zastrzeżone.<br />
            <a href="#polityka-prywatnosci" className="underline hover:text-gray-950 transition-colors mt-1 inline-block">
               Polityka Prywatności i Pliki Cookies
            </a>
          </p>
        </div>
      </footer>

      {/* Exit Intent Popup Trigger */}
      <ExitIntentPopup onSubscribeSuccess={handleExitPopupSubscribe} />
    </div>
  );
}
