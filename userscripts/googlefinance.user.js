// ==UserScript==
// @name        googlefinance portfolio
// @namespace   owq
// @include     *google*finance*
// @version     1
// @grant       none
// @require  https://cdn.jsdelivr.net/momentjs/2.12.0/moment-with-locales.min.js
// ==/UserScript==
//https://gist.github.com/ghalimi/4669712.js 
// Copyright (c) 2012 Sutoiku, Inc. (MIT License)
// Some algorithms have been ported from Apache OpenOffice:
/**************************************************************
 * 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 *************************************************************/
function XIRR(values, dates, guess) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Calculates the resulting amount
  var irrResult = function (values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
    }
    return result;
  };
  // Calculates the first derivation

  var irrResultDeriv = function (values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = moment(dates[i]).diff(moment(dates[0]), 'days') / 365;
      result -= frac * values[i] / Math.pow(r, frac + 1);
    }
    return result;
  };
  // Check that values contains at least one positive value and one negative value

  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }
  // Return error if values does not contain at least one positive value and one negative value

  if (!positive || !negative) return '#NUM!';
  // Initialize guess and resultRate
  guess = (typeof guess === 'undefined') ? 0.1 : guess;
  var resultRate = guess;
  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;
  // Set maximum number of iterations
  var iterMax = 50;
  // Implement Newton's method
  var newRate,
  epsRate,
  resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
  } while (contLoop && (++iteration < iterMax));
  if (contLoop) return '#NUM!';
  // Return internal rate of return
  return resultRate;
}
function toNumber(num) {
  return parseFloat(num);
}
function sharesToNumber(sh) {
  return toNumber(sh.replace(/,/g, ''));
}
function sumNum(arr) {
  return arr.reduce(function (p, cur) {
    return p + cur;
  });
}
window.addEventListener('load', function load(event) {
  if (google.finance.data) {
    console.log('ON IT');
    var data = google.finance.data;
    var marketValue = toNumber(data.portfolio_view.portfolio_table.su.mv.so);
    console.log(marketValue);
    var cashflows = [
    ];
    var dates = [
    ];
    var comms = [
    ];
    var txns = data.portfolio_view.transaction_table.txns;
    txns.forEach(function (e, i) {
      var sh = sharesToNumber(e.sh);
      var value = sh * toNumber(e.pc.so);
      var com = toNumber(e.com.so);
      var flow = e.tp == 1 ? - value - com : value - com;
      var date = moment(e.dti, 'YYYYMMDD');
      if (!isNaN(flow)) {
        cashflows.push(flow);
        dates.push(date);
        comms.push(com);
      }
    });
    cashflows.push(marketValue);
    dates.push(moment());
    console.log('HERE');
    var xirr = XIRR(cashflows, dates);
    var netCashFlow = sumNum(cashflows);
    
    console.log('XIRR: ' + xirr);
    console.log('Net cash in: ' + (marketValue - netCashFlow));
    console.log('Net Return: ' + netCashFlow);
    console.log("Comms: " + sumNum(comms));
  }
}, false);
