const rp = require('request-promise')
const cheerio = require('cheerio');
const _ = require('lodash');

exports.handler = async function(event, context) {
    let $ = cheerio.load(await rp('https://stock-ai.com/taiwan-stocks-ex-right-dividend-information'));
    const hash = $.html().match(/hashText="([^"]*)"/)[1];
    const dividends = await rp({
        uri: 'https://stock-ai.com/twStockDivQuery.php',
        qs: {
            a:'c',
            hash,
            _:Date.now(),
        },
        json: true
    });
    const parseDividends = dividends.data.map(({
        symbol,     //股票代號
        twTitle,    //股名
        url,        //網址
        drawDate,   //除權除息日
        rType,      //除權息 ["除權", "除息", "權息"]
        pRate,      //無償配股率
        rValue,     //現金股利
        mC,         //當前價格
        cDate,      //最後更新日
        c1,         //除權息次數
        cs1,        //除權息率
        arrX,         //最近24日股價
    }) => {
        let result = {
            symbol: cheerio.load(symbol).text(),
            twTitle: cheerio.load(twTitle).text(),
            url,
            drawDate,
            rType: cheerio.load(rType).text(),
            pRate: parseFloat(pRate),
            rValue: parseFloat(rValue),
            mC:  parseFloat(mC),
            cDate,
            c1: cheerio.load(c1).text(),
            cs1: parseFloat(cs1.substring(0, cs1.length - 1)),
            arrX: (cheerio.load(arrX))('span').contents()[0].data.trim().split(','),
        }
        result.referencePrice = (result.mC - result.rValue) / (1 + result.pRate);
        result.interestRateSpread = result.mC / result.referencePrice;

        return result;
    })

    $ = cheerio.load(await rp('https://www.taifex.com.tw/cht/2/stockLists'));
    const stockFutures = _.map($('#myTable tbody tr'), item => ({
        stockFutureSymbol: $(item).children('td').eq(0).text(),
        twTitleFull: $(item).children('td').eq(1).text(),
        symbol: $(item).children('td').eq(2).text(),
        twTitle: $(item).children('td').eq(3).text(),
        isStockFutureUnderlying: $(item).children('td').eq(4).text().trim() ? true : false,
        isStockOptionUnderlying: $(item).children('td').eq(5).text().trim() ? true : false,
        isStockExchangeUnderlying: $(item).children('td').eq(6).text().trim() ? true : false,
        isOTCUnderlying: $(item).children('td').eq(7).text().trim() ? true : false,
        isStockExchangeETFUnderlying: $(item).children('td').eq(8).text().trim() ? true : false,
        NumberOfStock: parseInt($(item).children('td').eq(9).text().replace(',','')),
    }));

    console.log(stockFutures);
}

exports.handler();