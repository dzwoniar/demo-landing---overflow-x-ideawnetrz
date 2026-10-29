# Idea Wnętrz × Overflow — landing page z kalkulatorem

Prototyp strony dla usług wykończenia wnętrz pod klucz. Łączy prezentację oferty, interaktywną kalkulację kosztów i formularz kontaktowy z widokiem podziękowania. Repozytorium pokazuje implementację interfejsu i ścieżki konwersji.

**Status: demo frontendu.** Wysyłka zgłoszeń, płatności i dostarczenie poradnika są symulowane w przeglądarce. Projekt nie zawiera backendu ani połączenia z CRM.

## Funkcje

- Responsywne menu, sekcje oferty, opinii i FAQ.
- Kalkulator: metraż, standard, zakres prac i planowany termin; przeliczenie widełek cenowych.
- Walidacja danych kontaktowych i przejście do widoku podziękowania.
- Popup z formularzem e-mail, wyzwalany czasem, przewijaniem lub próbą opuszczenia strony.
- Zapamiętanie zamknięcia popupu w `localStorage`.
- Demonstracyjna oferta dodatkowa i licznik czasu na ekranie podziękowania.

## Stack

React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4 i ikony Lucide. Dokładne deklaracje zależności i skrypty są w [`package.json`](package.json).

Fonty są pobierane z Google Fonts, a część obrazów z Unsplash i innych adresów zdefiniowanych w kodzie. Pełny wygląd wymaga dostępu do tych zasobów.

## Uruchomienie

Wymagane są Node.js **20.19+ w linii 20 albo 22.12+** oraz npm — ze względu na zadeklarowany `@vitejs/plugin-react` 5. Repozytorium nie ma pliku blokady zależności, więc `npm install` rozwiązuje wersje z zakresów w `package.json`.

```sh
git clone https://github.com/dzwoniar/demo-landing---overflow-x-ideawnetrz.git
cd demo-landing---overflow-x-ideawnetrz
npm install
npm run dev
```

Domyślny adres to [http://localhost:3000](http://localhost:3000). Skrypt deweloperski nasłuchuje na `0.0.0.0`; aby ograniczyć go do lokalnego komputera, uruchom `npm run dev -- --host 127.0.0.1`.

```sh
npm run lint     # kontrola typów: tsc --noEmit
npm run build    # wynik w dist/
npm run preview  # lokalny podgląd zbudowanej wersji
```

### Konfiguracja środowiska

[`.env.example`](.env.example) pochodzi ze szablonu AI Studio i wymienia `GEMINI_API_KEY` oraz `APP_URL`. Bieżący kod strony nie odczytuje tych zmiennych i nie wywołuje Gemini. Do lokalnego podglądu nie trzeba tworzyć `.env.local` ani podawać klucza API.

`DISABLE_HMR=true` jest odczytywane w [`vite.config.ts`](vite.config.ts) i wyłącza HMR oraz obserwowanie plików w środowisku deweloperskim.

## Struktura

```text
index.html
src/
  main.tsx                         # montowanie aplikacji React
  App.tsx                          # landing, podziękowanie, stan zgłoszenia
  constants.ts                     # FAQ, opinie i treści demonstracyjne
  types.ts
  index.css                        # Tailwind, fonty i style
  components/
    Header.tsx                     # nawigacja i menu mobilne
    InteractiveCalculator.tsx      # wycena i formularz
    FAQAccordion.tsx               # rozwijane pytania
    ExitIntentPopup.tsx            # popup oraz flaga localStorage
vite.config.ts
```

## Przepływ danych

`InteractiveCalculator` oblicza wynik na podstawie lokalnych stawek i przekazuje dane przez `onSubmitSuccess` do `App`. `App` przechowuje je w stanie React, pokazuje podziękowanie i zmienia adres przez History API na `/podziekowanie-wycena`. Dane formularza są również wypisywane do konsoli deweloperskiej.

Popup przechowuje tylko flagę `idea_exit_intent_dismissed` w `localStorage`; dane zgłoszenia pozostają w pamięci aplikacji. Odświeżenie nie odtwarza widoku podziękowania z zapisanych danych. Przy hostowaniu statycznym obsługa adresów SPA wymaga przekierowania do `index.html`.

## Granice demonstracji

- Komunikat sukcesu nie oznacza wysłania wiadomości, zapisu w bazie, zakupu ani pobrania pliku.
- Stawki, kalkulacja oszczędności i materiały marketingowe są elementem prototypu; README nie potwierdza wyników biznesowych ani aktualności wyceny.
- Zależności `@google/genai` i `express` są zadeklarowane w szablonie, ale repozytorium nie implementuje serwera ani funkcji AI.
- Nie ma skonfigurowanego zestawu testów automatycznych. Przed rozbudową warto sprawdzić kalkulator, walidację, FAQ, menu mobilne i pamiętanie zamknięcia popupu, używając danych testowych.

Punkt wyjścia projektu w AI Studio: [oryginalna aplikacja](https://ai.studio/apps/e0d087ad-8a59-4e9b-9b9f-5998c38f0481).
