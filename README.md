# w-opencc
A tool for opencc.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-opencc.svg?style=flat)](https://npmjs.org/package/w-opencc) 
[![license](https://img.shields.io/npm/l/w-opencc.svg?style=flat)](https://npmjs.org/package/w-opencc) 
[![npm download](https://img.shields.io/npm/dt/w-opencc.svg)](https://npmjs.org/package/w-opencc) 
[![npm download](https://img.shields.io/npm/dm/w-opencc.svg)](https://npmjs.org/package/w-opencc) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-opencc.svg)](https://www.jsdelivr.com/package/npm/w-opencc)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-opencc/global.html).

## Core
> `w-opencc` is based on the `opencc` in `python`, and only run in `Windows`.

## Installation

### Using npm(ES6 module):
```alias
npm i w-opencc
```

#### Example:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-opencc/blob/master/g.mjs)]
```alias
import WOpencc from './src/WOpencc.mjs'
//import WOpencc from 'w-opencc/src/WOpencc.mjs'
//import WOpencc from 'w-opencc'

async function test() {

    let sinp = `OpenCC是中文简繁转换开源项目，支持词汇级别的转换、异体字转换和地区习惯用词转换（中国大陆、台湾、香港、日本新字体）。不提供普通话与粤语的转换。`
    let opt = {}

    let r = await WOpencc(sinp, opt)
    console.log(r)
    // => OpenCC是中文簡繁轉換開源項目，支持詞彙級別的轉換、異體字轉換和地區習慣用詞轉換（中國大陸、臺灣、香港、日本新字體）。不提供普通話與粵語的轉換。

}
test()
    .catch((err) => {
        console.log('catch', err)
    })
```
