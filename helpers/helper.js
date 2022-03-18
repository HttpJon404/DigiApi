const axios = require('axios');


const infoLevels = async () => {
    const url = 'https://digimon-api.vercel.app/api/digimon';
    const { data } = await axios.get(url)

    
    const training = data.filter(data => data.level == 'In Training').length
    const fresh = data.filter(data => data.level == 'Fresh').length
    const rookie = data.filter(data => data.level == 'Rookie').length
    const champion = data.filter(data => data.level == 'Champion').length
    const armor = data.filter(data => data.level == 'Armor').length
    const ultimate = data.filter(data => data.level == 'Ultimate').length
    const mega = data.filter(data => data.level == 'Mega').length
    const total = data.length

    const info = [
        {
            level: 'In Training',
            cant: training
        },
        {
            level: 'Fresh',
            cant: fresh
        },
        {
            level: 'Rookie',
            cant: rookie
        },
        {
            level: 'Champion',
            cant: champion
        },
        {
            level: 'Ultimate',
            cant: ultimate
        },
        {
            level: 'Mega',
            cant: mega
        },
        {
            level: 'Armor',
            cant: armor
        },
        {
            level: 'Total',
            cant: total
        }

    ]
    return info;
}

const ordenar = async(lista =[])=> {
    lista.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase()

        if (fa < fb) {
            return -1
        }

        if (fa > fb) {
            return 1
        }

        return 0

    });

    return lista;


}

module.exports = {
    infoLevels,
    ordenar
}