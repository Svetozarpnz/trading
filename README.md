# Приложение трейдинг

Приложение позволяет анализировать сделки с целью совершенствования стратегий торговли. Для анализа используется новый подход "ростки", в котором каждая открытая позиция не может быть закрыта с убытком. Если происходит убыточное закрытие, то создаётся новый росток в сторону убывания. Содержание приложения лучше отражается по его бизнес-истории.

> **Бизнес-история** - это потребность и цель пользователя.

Пример истории: 
> Я как трейдер хочу, видеть историю сделок, чтобы иметь возможность их анализировать.

Пользователь всегда трейдер, поэтому оставляем потребность и цель: 
> видеть историю сделок, чтобы их анализировать.

## Истории для разработки приложения трейдер
###### *Жирным выделены реализованные истории*

#### Ввод данных
1. Загружать отчеты брокера, чтобы анализировать сделки в более удобном виде.
   * 1.1 Загружать стандартные html отчеты брокера, чтобы анализировать сделки в веб-приложении.
   * 1.2. Загружать стандартные csv отчеты брокера, чтобы анализировать сделки в веб-приложении.
   * 1.3. Загружать произвольные html отчеты брокера, чтобы анализировать сделки в веб-приложении.
   * 1.3.1. Настраивать html парсер, чтобы выбирать таблицу с отчётом.
   * 1.4. Загружать произвольные csv отчеты брокера, чтобы анализировать сделки в веб-приложении.
     * 1.4.1. Настраивать csv парсер, чтобы выбирать данные из таблицы с отчётом.
   * 1.5. Загружать данные по сделкам, сохранённые приложением (см. п. 5), чтобы анализировать сделки того сохраненния.
2. Добавлять вручную информацию о сделках, чтобы иметь альтернативу получения данных о сделках.
   * 2.1. Заполнять основные данные по сделке через форму, чтобы добавлять их в приложение.
3. Удалять изменять данные по сделкам, чтобы исправлять ошибочный ввод.
    * 3.1. Удалять неверные сделки, чтобы анализировать только верные данные по сделкам.
   * 3.2. Исправлять неполные или неверные сделки, чтобы анализировать только верные данные по сделкам.
   * 3.3. Очищать все сохраненные сделки, чтобы загружать или вводить данные с чистого листа.
4. Автоматически сохранять сделки в памяти компьютера, чтобы повторно не загружать отчеты брокера и не вводить данные по сделкам.
5. Выгражать данные по сделкам, чтобы загружать их в это приложение на другом компьютере.
6. Выбирать, присоединять загружаемые данные к текущим данным по сделкам или использовать отдельно, чтобы разные данные по сделкам анализировать по-отдельности.
    * 6.1. Выбирать отдельные портфели, чтобы не загружать их каждый раз для отдельного анализа
      * 6.1.1. Копировать информацию портфеля из одного в другой, чтобы склеивать две разные истории сделок и анализировать их как одну.
#### Таблица сделок
7. Видеть таблицу сделок, чтобы анализировать их.
8. Настраивать таблицу сделок, чтобы проводить удобный анализ.
   * 8.1. Сделать фильтр по акциям, чтобы видеть в таблице только сделки по выбранным акциия.
   * 8.2. Сделать фильтр по периодам, чтобы видеть в таблице только сделки за выбранный период.
     * 8.2.1. Сделать выбор периода (год, месяц), чтобы настраивать период в один клик.
     * 8.2.2. Сделать возможность сохранения пользовательского периода, чтобы каждый раз не настраивать этот период.
   * 8.3. Сделать фильтр по виду сделки (покупка/продажа), чтобы видеть только этот вид сделок.
   * 8.4. Сделать сброс настроенных фильтров, чтобы в один клик вернуться к исходным настройкам фильтров таблицы.
   * 8.5. Сделать сохранение и выбор настроенных фильтров, чтобы каждый раз не настраивать нужный фильтр таблицы.
   * 8.6. Сделать сортировку для столбцов, чтобы иметь возможность вверху таблицы видеть нижние сделки.
   * 8.7. Сделать настройку столбцов страницы, чтобы  видеть только нужные данные по сделкам в таблице.
     * 8.7.1. Сделать автоматическое сохранение настроек столбцов (см. п. 6.1.), чтобы каждый раз не настраивать столбцы.
9. Добавлять акции в избранное, чтобы они показывались всегда вверху таблицы независимо от сортировки
    * 9.1. редактировать порядок избранных акций, чтобы наиболее интересные акции были вверху
10. Переименовывать названия акций, чтобы старые и новые названия акций на бирже учитывались как одна и та же акция при сортировке, фильтрации и добавлению в избранное.
    * 10.1. Автоматически сохранять переименования для акций, чтобы каждый раз не настраивать переименование.
    * 10.2. При добавлении вручную информации о сделке видеть предупреждение о том, что акция будет переименована, чтобы искать её по другому названию в таблице.
#### Анализ торговли акциями
11. Видеть анализ акций отдельно от таблицы, чтобы анализировать вкупе все сделки по одной акции.
    * 11.1. Переключать анализ обычный и ростки, чтобы анализировать акции через разные подходы.
    * 11.2. Переключать анализ на обычный и ростки для всех акций сразу, чтобы не переключать для каждой в отдельности.
      * 11.2.1. Сохранять
12. В обычном анализе видеть:
    - число сделок по акции,
    - число открытых сделок по акции,
    - число закрытых сделок по акции,
    - число неудачных сделок по акции,
    - соотношение удачных сделок к общему числу сделок (удачливость сделок по акции),
    - общая прибыль/убыток по акции,
    - прибыль по удачно закрытым сделкам,
    - убыток по неудачно закрытым сделкам,
    - прибыль/убыток по открытым сделкам (в зависимости от текущей цены или цены последней сделки по акции),
      чтобы анализировать эффективность трейдинга по акции.
    * 12.1. Видеть таблицу удачно закрытых сделок, чтобы анализировать причины удачливости (под сделкой понимается пара из открытой и закрытой сделки).
    * 12.2. Видеть таблицу неудачно закрытых сделок, чтобы анализировать причины неудачливости.
    * 12.3. Видеть рассчитанную цену акции, при которой открытые сделки можно закрыть с нулевой прибылью (с учётом комиссии), чтобы продумывать закрытие открытых сделок.
      * 12.3.1. Видеть текущую прибыль/убыток по открытым акциям, чтобы оценивать текущее состояние открытых сделок.
13. В анализе ростков видеть:
    - число ростков,
    - число закрытых ростков,
    - число открытых ростков,
    - общая прибыль/убыток по акции (аналогично п. 12)
    - прибыль (убыточных ростков не существует) по закрытым росткам,
    - прибыль/убыток по открытым росткам (в зависимости от текущей цены или от цены последней сделки по акции),
      чтобы анализировать возможности для закрытия ростков (т.е. получения прибыли).
    * 13.1. Видеть таблицу закрытых ростков, чтобы анализировать причины удачливости.
    * 13.2. Видеть таблицу открытых ростков, чтобы анализировать возможности для закрытия.
    * 13.3. Видеть цену открытия и закрытия и объём акций, чтобы анализировать, как все открытые ростки можно закрыть.
14. Добавлять комментарий к сделкам по акциям и росткам, чтобы в дальнейшем строить стратегии сделок.
    * 14.1. Ссылаться в комментариях на другие сделки, чтобы в дальнейшем переходить на них при анализе стратегии сделок.
#### Эксперименты, диаграммы и графики
15. Создавать экспериментальные портфели, чтобы сравнивать результаты разных стратегий.
    * 15.1. Вводить цели и результаты экспериментальных портфелей, чтобы анализировать итоги при сравнении.
    * 15.2. Видеть график изменений разных портфелей и индекса, чтобы сравнивать поведение портфелей в различных рыночных ситуациях.
16. Видеть диаграмму вклада открытых сделок в текущий портфель, чтобы анализировать, какие акции увеличивают портфель, а какие мешают росту.
    * 16.1. Видеть диаграму вклада открытых сделок относительно вчерашнего дня, чтобы анализировать дневное влияние отдельных акций на портфель.
17. Помечать акции, по которым сделки заморожены, чтобы исключить их из диаграм влияния на портфель.
    * 17.1. Помечать акции как потери, чтобы учитывать в анализе вложения в них, как 100% потерю дохода.
18. Настраивать пользовательские комиссии, для рассчета сделок, чтобы они учитывались  в анализе введённых сделок.
19. Настроить загрузку котировок из внешних источников, чтобы каждый раз не вводить текущие цены.
20. Помечать введённые сделки как требующие уточнения рассчётов, чтобы при следующей загрузке отчётов они заменились более точной информацией о комиссии.
    * 20.1. При загрузке отчётов предупреждать о замене сделке на более точную, чтобы знать, что отчёты переписали более точные данные по сделке.
    * 20.2. При загрузке отчётов предупреждать о не замене сделки, требующую уточнения и входящую в период отчёта, чтобы знать, что сделка может вносить ошибки в анализ.
      * 20.2.1. Удалять сделку по кнопке сразу после загрузки, чтобы не пришлось искать её в таблице сделок для удаления.
21. Видеть состав портфеля в виде диаграммы (с учётом кэша), чтобы анализировать распределение средств по акциям.
