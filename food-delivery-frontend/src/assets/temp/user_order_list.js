var data = [
    {
        "store": "洋津義大利麵",
        "by": "DH",
        "total": 150
    },
    {
        "store": "鼎香169餐坊",
        "by": "DH",
        "total": 55
    },
    {
        "store": "鼎香169餐坊",
        "by": "DH",
        "total": 70
    },
    {
        "store": "廣東粥",
        "by": "DH",
        "total": 70
    }
]

const add = element => {
    data.push( element )
}

const read = () => {
    return data
}

export default { add, read }