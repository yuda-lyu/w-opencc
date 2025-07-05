import assert from 'assert'
import WOpencc from '../src/WOpencc.mjs'


function isWindows() {
    return process.platform === 'win32'
}


describe('WOpencc', function() {

    //check
    if (!isWindows()) {
        return
    }

    let strIn = `OpenCC是中文简繁转换开源项目，支持词汇级别的转换、异体字转换和地区习惯用词转换（中国大陆、台湾、香港、日本新字体）。不提供普通话与粤语的转换。`
    let strOut = `OpenCC是中文簡繁轉換開源項目，支持詞彙級別的轉換、異體字轉換和地區習慣用詞轉換（中國大陸、臺灣、香港、日本新字體）。不提供普通話與粵語的轉換。`

    it('convert', async function() {
        let r = strOut
        let rr = await WOpencc(strIn, {})
        assert.strict.deepEqual(r, rr)
    })

})
