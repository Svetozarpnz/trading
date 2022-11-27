// получение массива вида [9, 99, 999, 9999]
const getSmsTotals = (max) => {
    let count = 9;
    const totals = [9];
    while (count < max) {
        count += (count + 1) * 9;
        totals.push(count);
    }
    return totals;
};

// получение текущей длины суффикса
const getSuffixSize = (cur, max) => {
    return String(cur).length + 1 + String(max.length);
};

// получаем состояние цикла, который учитывает индексы
// начала каждой sms
const initState = (totals, minSms) =>
    totals.reduce((acc, smsTotal) => {
        if (smsTotal > minSms) {
            const configName = smsTotal.toString();
            return {
                ...acc,
                [configName]: {
                    index: 0,
                    current: 0,
                    suffixSize: getSuffixSize(1, smsTotal),
                    arr: [],
                },
            };
        }
        return acc;
    }, {});

// получение минимального из индексов
const getMinIndex = (state) =>
    Object.values(state).reduce((acc, { index }) => {
        if (index < acc) {
            return index;
        }
        return acc;
    }, Infinity);

// поиск индекса начала слова
const findNextIndex = (index, text) => {
    let i = index - 1;
    while (text[i] !== ' ') {
        i -= 1;
    }
    return i + 1;
};
// получить индекс символа для следующего sms
const getNextIndex = (index, size, text, length) => {
    const start = index + length - size;

    return start > text.length || text[start] === ' '
        ? start
        : findNextIndex(start, text);
};

// задать состояние цикла для следующей sms
const setNextSms = (state, text, length) => {
    Object.keys(state).forEach((configName) => {
        const { index, current } = state[configName];
        const nextSmsNum = current + 1;
        const suffixSize = getSuffixSize(nextSmsNum, configName);
        const currentConfig = state[configName];
        const nextIndex = getNextIndex(index, suffixSize, text, length);
        currentConfig.current += 1;
        currentConfig.suffixSize = suffixSize;
        currentConfig.index = getNextIndex(index, suffixSize, text, length);

        // добавление индекса в массив
        if (nextIndex < text.length) {
            currentConfig.arr.push(nextIndex);
        }

        // удаление конфига, который не вмещает текущее число sms
        if (nextSmsNum > Number(configName)) {
            delete state[configName];
        }
    });
};

// по массиву индекса получаем
const getSmsArray = (arr, text) => {
    return arr.map((index) => text.slice(index, index + 1));
};

/*
 * text - текст для дробления на SMS
 * length - размер SMS в символах
 * max - максимальное число SMS
 */

const splitToSms = (text, length = 140, max = 9999) => {
    const txtLen = text.length;

    if (txtLen <= length) {
        return [text];
    }

    const smsTotals = getSmsTotals(max);
    const minSms = txtLen / length;
    const loopState = initState(smsTotals, minSms);

    while (getMinIndex(loopState) < txtLen) {
        setNextSms(loopState, text, length);
    }

    const neededConfig = Object.values(loopState)[0].array;
    return getSmsArray(neededConfig, text);
};
