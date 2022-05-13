var data = [
    {
        "name": "劉承達",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "楊佳偉",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "李浩麟",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "沈明毅",
        "relationship": "朋友",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "高立宣",
        "relationship": "前輩",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "李登輝",
        "relationship": "爺爺",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "周念湘",
        "relationship": "師父",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "張宇喬",
        "relationship": "前輩",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "徐振家",
        "relationship": "前輩",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    },
    {
        "name": "貪吃佩可",
        "relationship": "女朋友",
        "phone": "0912345678",
        "address": "360苗栗縣苗栗市天雲街1巷1號"
    }
]

const add = element => {
    data.push( element )
}

const remove = index => {
    data.splice( index, 1 )
}

const read = () => {
    return data
}

export default { add, remove, read }