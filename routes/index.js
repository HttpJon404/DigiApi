var express = require('express');
const app = express();
var router = express.Router();
const axios = require('axios');
const helper = require('../helpers/helper')

const niveles = ['In Training', 'Fresh', 'Rookie', 'Champion', 'Ultimate', 'Mega', 'Armor']
/* GET home page. */
router.get('/:level?', async (req, res, next) => {

  const filtrarLevel = req.params.level;
  let url = 'https://digimon-api.vercel.app/api/digimon';



  if (filtrarLevel) {

    niveles.forEach(n => {
      if (n == filtrarLevel) {
        url = `https://digimon-api.vercel.app/api/digimon/level/${filtrarLevel}`;
      } else {
        // console.log('---')
      }
    });

  }

  const { data } = await axios.get(url)
  const info = await helper.infoLevels();
  const digis = await helper.ordenar(data);
  const encontrados = digis.length

  res.render('index', {
    title: 'Inicio',
    digis,
    info,
    encontrados
  });

})



router.get('/detalle/:digi', async (req, res, next) => {
  const nombreDigi = req.params.digi.toString().toLowerCase();

  const digimon = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${nombreDigi}`)

  const sameLevel = await axios.get(`https://digimon-api.vercel.app/api/digimon/level/${digimon.data[0].level}`)

  

  res.render('detalle',
    {
      digi: digimon.data[0],
      sameLevel: sameLevel.data
    });

});




router.get('/digimon/random', async (req, res, next) => {

  let url = 'https://digimon-api.vercel.app/api/digimon';
  const { data } = await axios.get(url)
  const random = Math.floor(Math.random() * data.length);

  res.render('random',
    {
      digi: data[random],

    });

});




module.exports = router;