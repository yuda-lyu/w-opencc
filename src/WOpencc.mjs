import path from 'path'
import fs from 'fs'
import process from 'process'
// import get from 'lodash-es/get.js'
import genID from 'wsemi/src/genID.mjs'
import str2b64 from 'wsemi/src/str2b64.mjs'
import execProcess from 'wsemi/src/execProcess.mjs'
import fsIsFile from 'wsemi/src/fsIsFile.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cstr from 'wsemi/src/cstr.mjs'


let fdSrv = path.resolve()


function isWindows() {
    return process.platform === 'win32'
}


/**
 * opencc簡體轉繁體
 *
 * @param {String} str 輸入簡體中文字串
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @returns {Promise} 回傳Promise，resolve回傳繁體中文字串，reject回傳錯誤訊息
 * @example
 *
 * import WOpencc from 'w-opencc'
 *
 * async function test() {
 *
 *     let sinp = `OpenCC是中文简繁转换开源项目，支持词汇级别的转换、异体字转换和地区习惯用词转换（中国大陆、台湾、香港、日本新字体）。不提供普通话与粤语的转换。`
 *     let opt = {}
 *
 *     let r = await WOpencc(sinp, opt)
 *     console.log(r)
 *     // => OpenCC是中文簡繁轉換開源項目，支持詞彙級別的轉換、異體字轉換和地區習慣用詞轉換（中國大陸、臺灣、香港、日本新字體）。不提供普通話與粵語的轉換。
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log('catch', err)
 *     })
 *
 */
async function WOpencc(str, opt = {}) {
    let errTemp = null

    //isWindows
    if (!isWindows()) {
        return Promise.reject('operating system is not windows')
    }

    //check
    if (!isestr(str)) {
        return Promise.reject('str is not a string')
    }

    //fnExe
    let fnExe = `cvcc.exe`

    //fdExe
    let fdExe = ''
    if (true) {
        let fdExeSrc = `${fdSrv}/src/`
        let fdExeNM = `${fdSrv}/node_modules/w-opencc/src/`
        if (fsIsFile(`${fdExeSrc}${fnExe}`)) {
            fdExe = fdExeSrc
        }
        else if (fsIsFile(`${fdExeNM}${fnExe}`)) {
            fdExe = fdExeNM
        }
        else {
            return Promise.reject('can not find folder for opencc')
        }
    }
    // console.log('fdExe', fdExe)

    //prog
    let prog = `${fdExe}${fnExe}`
    // console.log('prog', prog)

    //id
    let id = genID()

    //fpIn
    let fpIn = `${fdExe}_${id}_fpIn.txt`
    // console.log('fpIn', fpIn)

    //fpIn
    let fpOut = `${fdExe}_${id}_fpOut.txt`
    // console.log('fpOut', fpOut)

    //input
    // let input = o2j({ inp: str })
    let input = str

    //save
    fs.writeFileSync(fpIn, input, 'utf8')

    //inp
    let inp = {
        fpIn,
        fpOut,
        opt: {},
    }
    // console.log('inp', inp)

    //input to b64
    let cInput = JSON.stringify(inp)
    let b64Input = str2b64(cInput)
    // console.log('b64Input', b64Input)

    //execProcess
    await execProcess(prog, b64Input)
        .catch((err) => {
            console.log('execProcess catch', err)
            errTemp = err.toString()
        })

    //read output
    let output = null
    try {
        output = fs.readFileSync(fpOut, 'utf8')
        // console.log('output', output)
    }
    catch (err) {}

    //unlinkSync
    try {
        fs.unlinkSync(fpIn)
    }
    catch (err) {}

    //unlinkSync
    try {
        fs.unlinkSync(fpOut)
    }
    catch (err) {}

    //check
    if (errTemp) {
        return Promise.reject(errTemp)
    }

    //check
    if (!isestr(output)) {
        return Promise.reject(`output[${cstr(output)}] is not an effective string`)
    }

    return output
}


export default WOpencc
