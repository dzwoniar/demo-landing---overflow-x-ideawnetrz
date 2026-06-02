import { Testimonial, FAQItem } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Michał K.',
    role: 'Właściciel domu jednorodzinnego (140 m²)',
    company: 'Inwestor prywatny',
    location: 'Warszawa',
    text: 'Dziękuję panu Jackowi i całej ekipie Idea Wnętrz. Budżet ryczałtowy wskazany na umowie został zachowany co do grosza. Zero niespodzianek czy dopłat na koniec pracy. Dom został oddany w idealnym stanie technicznym w 58 dni roboczych. Pełen profesjonalizm i spokój ducha.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    metric: 'Gwarancja budżetu',
    industry: 'Dom pod klucz'
  },
  {
    id: 't2',
    name: 'Marta S.',
    role: 'Właścicielka apartamentu (65 m²)',
    company: 'Inwestorka prywatna',
    location: 'Wrocław',
    text: 'Cotygodniowe raporty fotograficzne przysyłane w każdy piątek dały mi niesamowity święty spokój. Wiedziałam o każdym szczególe bez konieczności ciągłego jeżdżenia na budowę. Oszczędność na podatku VAT 8% zamiast 23% wyniosła w moim przypadku ponad 22 500 zł, co realnie obniżyło koszty wykończenia całego apartamentu.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    metric: 'Raporty online',
    industry: 'Mieszkanie pod klucz'
  },
  {
    id: 't3',
    name: 'Janusz Kowalczyk',
    role: 'CEO Kowalczyk Holding',
    company: 'Kowalczyk Holding',
    location: 'Gdańsk',
    text: 'Model Open Book przy remoncie i wykończeniu naszego nowego biura to była czysta rewolucja w transparentności. Otrzymaliśmy wgląd w komplet faktur zakupowych od wszystkich dostawców i podwykonawców z zerową marżą Idea Wnętrz, płacąc wyłącznie stałą, umówioną kwotę za zarządzanie kontraktem. Nasz audytor finansowy był zachwycony uczciwością rozliczenia.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    metric: 'Model Open Book',
    industry: 'Fit-out komercyjny'
  }
];

export const TRUST_STATS = [
  { label: 'Zrealizowanych projektów', value: '124' },
  { label: 'Lat doświadczenia', value: '8' },
  { label: 'Projektów oddanych w terminie', value: '97%' },
  { label: 'Projektów bez przekroczenia budżetu', value: '100%' }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Czym różnicie się od zwykłej firmy remontowej?',
    answer: 'Zwykła firma remontowa bierze zlecenie i realizuje zakres z umowy. Jeśli coś idzie nie tak — szuka powodu, żeby doliczyć aneks. My łączymy dwie role, które na rynku są zazwyczaj oddalone od siebie. Jako Inwestor Zastępczy reprezentujemy Twoje interesy — kontrolujemy budżet i harmonogram. Jako Wykonawca Generalny sami realizujemy prace budowlano-wykończeniowe i bierzemy za nie pełną odpowiedzialność. Nie ma kłótni ani zrzucania winy na zewnętrznych podwykonawców. Jest jeden podmiot i jedna umowa.'
  },
  {
    question: 'Co to znaczy "gwarancja 0% odchylenia budżetu"?',
    answer: 'Podpisujemy umowę z ceną ryczałtową ustaloną przed rozpoczęciem jakichkolwiek prac fizycznych na terenie inwestycji. Jeśli materiały lub robocizna w trakcie drożeją — to nasz koszt i nasze ryzyko, nie Twoje. Jedyna sytuacja, w której cena ulega zmianie: gdy Ty sam w trakcie realizacji zdecydujesz się rozszerzyć lub zmodyfikować pierwotny zakres prac. Wtedy wspólnie uzgadniamy warunki dodatkowe, a aneks podpisujemy wyłącznie z Twoją świadomą, pisemną zgodą.'
  },
  {
    question: 'Co to jest VAT 8% i skąd ta oszczędność 15%?',
    answer: 'Kiedy kupujesz materiały budowlano-wykończeniowe samodzielnie w sklepie, płacisz standardową stawkę VAT 23%. Kiedy jednak zamawiasz te materiały wraz z usługą montażu w ramach jednej, kompleksowej umowy z nami jako wykonawcą, na całość przysługuje Ci preferencyjna, ustawowa stawka VAT 8%. Różnica wynosi dokładnie 15 punktów procentowych — przy budżecie rzędu 150 000 PLN oznacza to oszczędność aż 22 500 PLN, które zostają bezpośrednio w Twojej kieszeni.'
  },
  {
    question: 'Co to jest model Open Book i dla kogo?',
    answer: 'Model Open Book to partnerski sposób rozliczeń stworzony dla klientów biznesowych i komercyjnych (zarządów, biur, hoteli, klinik). Pokazujemy Ci w pełni faktyczne faktury zakupowe od wszystkich dostawców materiałów i podwykonawców bez narzucania jakiejkolwiek ukrytej marży. Pobieramy wyłącznie stałą, ustaloną z góry opłatę za zarządzanie kontraktem (project management fee). To daje 100% przejrzystości dla Twojego zarządu, banku oraz audytorów finansowych.'
  },
  {
    question: 'Jaki jest minimalny metraż projektu?',
    answer: 'Obsługujemy standardowo lokale i obiekty wykończeniowe o metrażu od 45 m² wzwyż. W przypadku inwestycji o mniejszej powierzchni prosimy o bezpośredni kontakt telefoniczny z naszym biurem pod numerem +48 500 200 300, abyśmy mogli indywidualnie ocenić możliwości logistyczne.'
  },
  {
    question: 'Na jaki termin można się umówić?',
    answer: 'Z uwagi na dbałość o rygorystyczne standardy jakościowe (SLA), równolegle prowadzimy ograniczoną liczbę kontraktów. Orientacyjny czas oczekiwania na wolny termin rozpoczęcia prac ekipy wynosi obecnie od 4 do 8 tygodni od momentu podpisania umowy. Sprawdź orientacyjny termin, podając preferowane ramy czasowe bezpośrednio w naszym kalkulatorze wyceny.'
  },
  {
    question: 'Obsługujecie cały kraj?',
    answer: 'Tak, dzięki wypracowanej siatce sprawdzonych rzemieślników, kierowników budów i dostawców sprzętowych, realizujemy projekty wykończenia wnętrz pod klucz oraz fit-outy komercyjne na terenie całego kraju. Główne biura operacyjne oraz showroomy mamy zlokalizowane w Warszawie, Gdańsku i we Wrocławiu.'
  }
];
