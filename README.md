# Zadanie rekrutacyjne
Zadaniem jest stworzenie aplikacji do wyświetlania prognozy pogody na najbliższe 7 dni korzystając z zewnętrznego API. Dodatkowo aplikacja powinna oszacować prognozowaną produkcję energii z instalacji fotowoltaicznej.

## Frontend
Celem będzie stworzenie tabeli z prognozą pogody na kolejne 7 dni oraz stopki z informacjami ogólnymi dla całego tygodnia. Wykorzystasz do tego wcześniej przygotowane endpoiny API, do których przekażesz szerokość i wysokość geograficzną. Szerokość i wysokość geograficzna powinna zostać automatycznie pobrana na podstawie aktualnej lokalizacji.
Tabela, którą stworzysz, powinna posiadać osobną kolumnę dla każdego z siedmiu dni. Ważne jest, aby była ona czytelna.
### W każdej kolumnie powinny znaleźć się następujące informacje:
*	Data w formacie DD/MM/YYYY. Reprezentuje ona konkretny dzień, dla którego generowana jest prognoza.
*	Ikona pogody, która ilustruje przewidywane warunki atmosferyczne. Informacje na temat kodów pogodowych można znaleźć w zewnętrznym API, a następnie przypisać odpowiedni kod do odpowiadającej mu ikony. Najłatwiej będzie skorzystać z gotowego pakietu ikon dostępnego na stronie: https://fontawesome.com/search
*	Temperatura maksymalna i minimalna w danym dniu
*	Szacowana wartość wygenerowanej energii w kWh, co jest szczególnie cenne dla osób, które korzystają z energii słonecznej.
### Na stopce powinny znaleźć się:
*	Skrajne temperatury jakie pojawią się w ciągu tygodnia
*	Średnie ciśnienie w ciągu najbliższego tygodnia
*	Średni czas ekspozycji na słońce w ciągu najbliższego tygodnia
*	Komentarz podsumowujący prognozę

## Nice to Have
* Responsywność
* Dark mode
* Mapa świata z możliwością wyboru lokalizacji (Leaflet — an open-source JavaScript library for interactive maps)
