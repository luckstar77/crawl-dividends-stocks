# crawl-dividends-stocks

這是為了找出賺錢的策略所做的函式，主要依據每年填權息成功並且可以用股票期貨買到的標的去做篩選  

可變策略有  

INTEREST_RATE_SPREAD                //殖利率  
CS1                                 //除權息率  
C1                                  //除權息次數  

共有以下資訊可供查詢  

symbol                              //股票代號  
twTitle                             //股名  
url                                 //網址  
drawDate                            //除權除息日  
rType                               //除權息 ["除權", "除息", "權息"]  
pRate                               //無償配股率  
rValue                              //現金股利  
mC                                  //當前價格  
cDate                               //最後更新日  
c1                                  //除權息次數  
cs1                                 //除權息率  
arrX                                //最近24日股價  
referencePrice                      //除權息參考價  
interestRateSpread                  //殖利率  
stockFutureSymbol                   //股票期貨、選擇權商品代碼  
twTitleFull                         //標的證券  
symbol                              //證券代號  
twTitle                             //標的證券簡稱  
isStockFutureUnderlying             //是否為股票期貨標的  
isStockOptionUnderlying             //是否為股票選擇權標的  
isStockExchangeUnderlying           //上市普通股標的證券  
isOTCUnderlying                     //上櫃普通股標的證券  
isStockExchangeETFUnderlying        //上市ETF標的證券  
NumberOfStock                       //標準型證券股數  