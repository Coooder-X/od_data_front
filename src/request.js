import axios from 'axios';

export function connectionTest() {
    console.log('connectionTest');
    axios.get('/api').then((res) => {
        console.log('success')
        console.log(res)
    })
}

export async function getOdGraphByTime(params) {
    console.log('params', params)
    return await axios.get('/api/getODGraphByTime', params).then((res) => {
        console.log('getODGraphByTime', res)
        console.log('typeof', typeof(res.data))
        const totalOdInfo = new Map()
        Object.keys(res.data).forEach((key) => {
            totalOdInfo.set(key, res.data[key]);
        })
        return totalOdInfo
    })
}

export async function saveSelectedData(params) {
    return await axios.post('/api/saveSelectedData', params).then((res) => {
        console.log('save post', res)
    });
}
export async function getHistoryFile(params) {
    return await axios.get('/api/getHistoryFile', params).then((res) => {
        console.log('getHistoryFile', res.data)
        return res.data
    })
}

export async function getHistoryFileList() {
    return await axios.get('/api/getHistoryFileList').then((res) => {
        console.log('getHistoryFileList', res.data)
        return res.data
    })
}

// export function getTrjsByTime(params) {
//     console.log('params', params)
//     axios.get('/api/getTrjsByTime', params).then((res) => {
//         console.log('getTrjsByTime', res)
//         //  设置 od 点的坐标数组和 index 序号数组
//         // const month = Object.keys(res.data)[0];
//         // console.log('month', month)
//         // context.commit('setAllODPoints', res.data[month]['od_points']);
//         // context.commit('setODIndexList', res.data[month]['index_lst']);
//         // context.commit('setPointsExist', res.status === 200);
//     })
// }

