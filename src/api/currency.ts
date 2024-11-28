import axios from "axios";

import { Rates } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

export async function getCurrency(base: string = "UAH"): Promise<void | Rates> {
  // const res = {
  //   data: {
  //     success: true,
  //     terms: "https://fxfeed.io/terms",
  //     privacy: "https://fxfeed.io/privacy",
  //     timestamp: 1732817558,
  //     date: "2024-11-28T18:12:38Z",
  //     base: "UAH",
  //     rates: {
  //       ADA: 0.023516,
  //       AED: 0.08855,
  //       AFN: 1.640114,
  //       AKT: 0.005905,
  //       ALL: 2.248202,
  //       AMD: 9.389464,
  //       AMP: 4.074561,
  //       ANG: 0.04328,
  //       AOA: 22.186688,
  //       APE: 0.018174,
  //       APT: 0.001881,
  //       ARB: 0.025489,
  //       ARS: 24.302344,
  //       ATS: 0.314158,
  //       AUD: 0.037113,
  //       AWG: 0.043156,
  //       AXS: 0.003146,
  //       AZM: 205.008519,
  //       AZN: 0.040009,
  //       BAM: 0.044653,
  //       BAT: 0.079105,
  //       BBD: 0.048219,
  //       BCH: 0.000046,
  //       BDT: 2.880704,
  //       BEF: 0.920992,
  //       BGN: 0.044729,
  //       BHD: 0.008996,
  //       BIF: 71.154782,
  //       BMD: 0.024109,
  //       BNB: 0.000036,
  //       BND: 0.031427,
  //       BOB: 0.166827,
  //       BRL: 0.143831,
  //       BSD: 0.024109,
  //       BSV: 0.000337,
  //       BSW: 0.302936,
  //       BTC: 0,
  //       BTG: 0.000665,
  //       BTN: 2.035808,
  //       BTT: 17940.545629,
  //       BWP: 0.328825,
  //       BYN: 0.078862,
  //       BYR: 788.368393,
  //       BZD: 0.048705,
  //       CAD: 0.033778,
  //       CDF: 68.979799,
  //       CFX: 0.129409,
  //       CHF: 0.021301,
  //       CHZ: 0.258744,
  //       CLP: 23.562672,
  //       CNH: 0.174838,
  //       CNY: 0.174733,
  //       COP: 105.721998,
  //       CRC: 12.288475,
  //       CRO: 0.135812,
  //       CRV: 0.047573,
  //       CUC: 0.024109,
  //       CUP: 0.577878,
  //       CVE: 2.517553,
  //       CVX: 0.007823,
  //       CYP: 0.013362,
  //       CZK: 0.577946,
  //       DAI: 0.024116,
  //       DCR: 0.001436,
  //       DEM: 0.044653,
  //       DFI: 1.55227,
  //       DJF: 4.286684,
  //       DKK: 0.170557,
  //       DOP: 1.457213,
  //       DOT: 0.002843,
  //       DZD: 3.219856,
  //       EEK: 0.357225,
  //       EGP: 1.197497,
  //       ENJ: 0.085036,
  //       EOS: 0.029238,
  //       ERN: 0.361642,
  //       ESP: 3.798726,
  //       ETB: 2.970225,
  //       ETC: 0.000755,
  //       ETH: 0.000006,
  //       EUR: 0.022869,
  //       FEI: 0.024559,
  //       FIL: 0.004115,
  //       FIM: 0.135745,
  //       FJD: 0.054679,
  //       FKP: 0.019019,
  //       FLR: 1.024553,
  //       FRF: 0.14976,
  //       FTM: 0.022609,
  //       FTT: 0.010287,
  //       FXS: 0.007494,
  //       GBP: 0.019034,
  //       GEL: 0.066106,
  //       GGP: 0.019019,
  //       GHC: 3757.587679,
  //       GHS: 0.375758,
  //       GIP: 0.019019,
  //       GMD: 1.722108,
  //       GMX: 0.000801,
  //       GNF: 207.795809,
  //       GNO: 0.000089,
  //       GRD: 7.779597,
  //       GRT: 0.093818,
  //       GTQ: 0.186061,
  //       GYD: 5.0358,
  //       HKD: 0.187638,
  //       HNL: 0.609816,
  //       HNT: 0.00363,
  //       HOT: 8.299304,
  //       HRK: 0.172018,
  //       HTG: 3.163028,
  //       HUF: 9.441406,
  //       I44: 0.002203,
  //       ICP: 0.002077,
  //       IDR: 382.722874,
  //       IEP: 0.01798,
  //       ILS: 0.087941,
  //       IMP: 0.019019,
  //       IMX: 0.013582,
  //       INJ: 0.000813,
  //       INR: 2.036558,
  //       IQD: 31.609791,
  //       IRR: 1014.625872,
  //       ISK: 3.318431,
  //       ITL: 44.206605,
  //       JEP: 0.019019,
  //       JMD: 3.835739,
  //       JOD: 0.017093,
  //       JPY: 3.656678,
  //       KAS: 0.158045,
  //       KCS: 0.00205,
  //       KDA: 0.020163,
  //       KES: 3.119669,
  //       KGS: 2.092712,
  //       KHR: 97.029649,
  //       KMF: 11.23202,
  //       KNC: 0.036428,
  //       KPW: 21.698801,
  //       KRW: 33.671216,
  //       KSM: 0.00064,
  //       KWD: 0.007401,
  //       KYD: 0.019884,
  //       KZT: 12.083058,
  //       LAK: 527.681646,
  //       LBP: 2166.755572,
  //       LDO: 0.013582,
  //       LEO: 0.002803,
  //       LKR: 6.907742,
  //       LRC: 0.102103,
  //       LRD: 4.329574,
  //       LSL: 0.4387,
  //       LTC: 0.000246,
  //       LTL: 0.07883,
  //       LUF: 0.920992,
  //       LVL: 0.016045,
  //       LYD: 0.118039,
  //       MAD: 0.237011,
  //       MBX: 0.055261,
  //       MDL: 0.439825,
  //       MGA: 108.387568,
  //       MGF: 563.748196,
  //       MKD: 1.404344,
  //       MKR: 0.000012,
  //       MMK: 50.614554,
  //       MNT: 82.404196,
  //       MOP: 0.193253,
  //       MRO: 9.597958,
  //       MRU: 0.959795,
  //       MTL: 0.009801,
  //       MUR: 1.126524,
  //       MVR: 0.371934,
  //       MWK: 41.835803,
  //       MXN: 0.490375,
  //       MXV: 0.060093,
  //       MYR: 0.107214,
  //       MZM: 1540.715022,
  //       MZN: 1.540715,
  //       NAD: 0.4387,
  //       NEO: 0.001597,
  //       NFT: 47220.060466,
  //       NGN: 40.726104,
  //       NIO: 0.887367,
  //       NLG: 0.050312,
  //       NOK: 0.266755,
  //       NPR: 3.25882,
  //       NZD: 0.040964,
  //       OKB: 0.000439,
  //       OMR: 0.009181,
  //       ONE: 1.009834,
  //       PAB: 0.024109,
  //       PEN: 0.090706,
  //       PGK: 0.09312,
  //       PHP: 1.41501,
  //       PKR: 6.624597,
  //       PLN: 0.098569,
  //       PTE: 4.577165,
  //       PYG: 188.163476,
  //       QAR: 0.087758,
  //       QNT: 0.000252,
  //       ROL: 1136.172961,
  //       RON: 0.11383,
  //       RPL: 0.001741,
  //       RSD: 2.670478,
  //       RUB: 2.72801,
  //       RVN: 0.982233,
  //       RWF: 33.207083,
  //       SAR: 0.089533,
  //       SBD: 0.20189,
  //       SCR: 0.328609,
  //       SDD: 1450.123975,
  //       SDG: 14.501239,
  //       SEK: 0.263862,
  //       SGD: 0.032395,
  //       SHP: 0.019019,
  //       SIT: 5.471174,
  //       SKK: 0.6878,
  //       SLE: 0.548478,
  //       SLL: 548.478184,
  //       SNX: 0.010091,
  //       SOL: 0.000099,
  //       SOS: 13.753163,
  //       SPL: 0.004018,
  //       SRD: 0.858638,
  //       SRG: 858.638442,
  //       STD: 564.345314,
  //       STN: 0.564345,
  //       STX: 0.010432,
  //       SUI: 0.006906,
  //       SVC: 0.210958,
  //       SYP: 313.468802,
  //       SZL: 0.4387,
  //       THB: 0.829973,
  //       TJS: 0.258682,
  //       TMM: 423.112997,
  //       TMT: 0.084622,
  //       TND: 0.075915,
  //       TON: 0.003755,
  //       TOP: 0.056303,
  //       TRL: 835797.459024,
  //       TRX: 0.119486,
  //       TRY: 0.834328,
  //       TTD: 0.163757,
  //       TVD: 0.03705,
  //       TWD: 0.772176,
  //       TWI: 0.002006,
  //       TWT: 0.021629,
  //       TZS: 61.866428,
  //       UGX: 89.00288,
  //       UNI: 0.001892,
  //       USD: 0.024109,
  //       UYU: 1.032739,
  //       UZS: 309.070606,
  //       VAL: 44.206605,
  //       VEB: 112821364.763635,
  //       VED: 1.128228,
  //       VEF: 112822.839672,
  //       VES: 1.128228,
  //       VET: 0.564029,
  //       VND: 604.797144,
  //       VUV: 2.872889,
  //       WOO: 0.087892,
  //       WST: 0.067053,
  //       XAF: 14.976027,
  //       XAG: 0.000808,
  //       XAU: 0.000009,
  //       XBT: 0,
  //       XCD: 0.065222,
  //       XCH: 0.001013,
  //       XDC: 0.429919,
  //       XDR: 0.018331,
  //       XEC: 486.149795,
  //       XEM: 0.85879,
  //       XLM: 0.048924,
  //       XMR: 0.000154,
  //       XOF: 14.808308,
  //       XPD: 0.000024,
  //       XPF: 2.68541,
  //       XPT: 0.000025,
  //       XRP: 0.016408,
  //       XTZ: 0.018874,
  //       YER: 6.021762,
  //       ZAR: 0.437639,
  //       ZEC: 0.000428,
  //       ZIL: 0.956861,
  //       ZMK: 664.253136,
  //       ZMW: 0.664253,
  //       ZWD: 8.725233,
  //       ZWG: 0.609763,
  //       ZWL: 1523.629991,
  //     },
  //   },
  // };

  try {
    const res = await axios.get(
      `https://api.fxfeed.io/v1/latest?base=${base}&api_key=${apiKey}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
