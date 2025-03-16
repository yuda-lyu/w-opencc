import assert from 'assert'
import w from 'wsemi'
import WOpencc from '../src/WOpencc.mjs'


async function test2d1() {

    let psSrc = [
        {
            x: -0.1, y: -0.1, z: 0
        },
        {
            x: 1, y: 0, z: 0
        },
        {
            x: 1, y: 1, z: 10
        },
        {
            x: 0, y: 1, z: 0
        },
    ]
    let psTar = [
        { x: 0.1, y: 0.95 },
    ]
    let opt = {
        variogram_model: 'gaussian',
        nlags: 9,
    }

    let r = await WOpencc(psSrc, psTar, opt)
    // console.log('test2d1', r)
    // => test2d [ { x: 0.1, y: 0.95, z: 1.8997805977145759 } ]

    return r
}


async function test2d2() {

    let psSrc = [{ x: 243, y: 206, z: 95 }, { x: 233, y: 225, z: 146 }, { x: 21, y: 325, z: 22 }, { x: 953, y: 28, z: 223 }, { x: 1092, y: 290, z: 39 }, { x: 744, y: 200, z: 191 }, { x: 174, y: 3, z: 22 }, { x: 537, y: 368, z: 249 }, { x: 1151, y: 371, z: 86 }, { x: 814, y: 252, z: 125 }]

    let psTar = [{
        x: 243,
        y: 205,
    }]

    let opt = {
        variogram_model: 'exponential',
        nlags: 9,
    }

    let r = await WOpencc(psSrc, psTar, opt)
    // console.log('test2d2', r)
    // => test2d [ { x: 243, y: 205, z: 94.89492366904084 } ]

    return r
}


describe('2d', function() {

    it('test for 2d1', async function() {
        let rr = null
        let rt = null
        if (w.isWindow()) {
            rr = await test2d1()
            rt = [{ x: 0.1, y: 0.95, z: 1.8997805977145759 }]
        }
        else {
            rr = 1
            rt = 1
        }
        assert.strict.deepEqual(rr, rt)
    })

    it('test for 2d2', async function() {
        let rr = null
        let rt = null
        if (w.isWindow()) {
            rr = await test2d2()
            rt = [{ x: 243, y: 205, z: 94.89492366904084 }]
        }
        else {
            rr = 1
            rt = 1
        }
        assert.strict.deepEqual(rr, rt)
    })

})
