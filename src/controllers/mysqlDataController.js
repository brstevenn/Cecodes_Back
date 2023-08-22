const sequelize = require('../config/dbMysql');
const { Op } = require('sequelize')
const { Main, Scope, Type, SubType, SubTypeInferior, Month, TypeValue } = require('../models/relations');
const SubTypeInferiorValue = require('../models/subTypeInferiorValue');
const SubTypeValue = require('../models/subTypeValue');


const createTables = async (req, res) => {
  try {
    // Sincronizar los modelos con la base de datos para crear las tablas
    await sequelize.sync({ force: true });

    // Crear registros de meses

    /*
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    for (const nombreMes of meses) {
      await Month.create({ nombre: nombreMes });
    }

    */
    res.json({ message: 'Tablas creadas exitosamente' });
  } catch (error) {
    console.error('Error al crear las tablas:', error);
    res.status(500).json({ error: 'Error al crear las tablas' });
  }
};


const getAll = async (req, res) => {
  try {
    let main = []
    await sequelize.transaction(async (t) => {


      const main2 = await Main.findAll({
        include: [
          {
            model: Scope,
            include: [
              {
                model: Type,
                include: [
                  {
                    model: SubType,
                    include: [
                      {
                        model: SubTypeInferior,
                        required: true,
                        include: [
                          {
                            model: SubTypeInferiorValue,
                            required: true,
                            attributes: { exclude: ["subTipoInferiorId", "valorSubTipoInferiorId"] }
                          }
                        ],
                        attributes: { exclude: ["subTipoInferiorId", "subTipoId"] }
                      },
                      {
                        model: SubTypeValue,
                        attributes: { exclude: ["subTipoId", "valorSubTipoId"] }
                      }
                    ],
                    attributes: { exclude: ["tipoId", "subTipoId"] }
                  },
                  {
                    model: TypeValue,
                    attributes: { exclude: ["tipoId", "valorTipoId"] }
                  }
                ],
                attributes: { exclude: ["tipoId", "alcanceId"] }
              }
            ],
            attributes: { exclude: ["principalId", "alcanceId"] }
          }
        ],
        attributes: { exclude: ["principalId"] }
      });

      console.log(main2)
      main = main2
    })

    /*
    function convertKeysToLower(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
    
      if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToLower(item));
      }
    
      const newObj = {};
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const newKey = key.toLowerCase();
          newObj[newKey] = convertKeysToLower(obj[key]);
        }
      }
      return newObj;
    }
    */

    const data = {
      "empresa": "Nombre de la empresa 2",
      "planta": "Nombre de la planta 2",
      "ubicacion": "Ubicacion 2",
      "año": "2022",
      "alcances": [
        {
          "nombre": "Alcance 1",
          "meta": 30,
          "tipos": [
            {
              "nombre": "Combustibles",
              "meses": null,
              "subTipos": [
                {
                  "nombre": "Carbón",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Carbón",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Bagazo",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                },
                {
                  "nombre": "Biodiesel",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Biosiesel palma",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Combustóleo",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                }
              ]
            },
            {
              "nombre": "Emisiones Fugitivas",
              "meses": null,
              "subTipos": [
                {
                  "nombre": "Aguas Residuales Domesticas",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Vertimientos domésticos a cloaca o alcantarilla",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Vertimientos domésticos tratados 1 (PTAR aeróbica sobrecargada)",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                },
                {
                  "nombre": "Aguas Residuales Industriales",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Vertimiento industriales tratados 1: PTAR aeróbica sobrecargada",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Vertimiento industriales tratados 2: Digestor o reactor anaérobico",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                }
              ]
            },
            {
              "nombre": "Gases Refrigerantes",
              "meses": null,
              "subTipos": [
                {
                  "nombre": "Bromuro de Metilo (CH3Br)",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Bromuro de Metilo  : CH3Br",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                },
                {
                  "nombre": "CFC-11 (CCl3F)",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "CFC-11 : CCl3F",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "CFC-113 : CCl2FCClF2",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "nombre": "Alcance 2",
          "meta": 30,
          "tipos": [
            {
              "nombre": "Eléctricidad",
              "meses": {
                "febrero": 22,
                "noviembre": 34
              },
              "subTipos": null
            },
            {
              "nombre": "Hidroéctrica",
              "meses": {
                "febrero": 22,
                "noviembre": 34
              },
              "subTipos": null
            },
            {
              "nombre": "Solar",
              "meses": {
                "febrero": 22,
                "noviembre": 34
              },
              "subTipos": null
            }
          ]
        },
        {
          "nombre": "Alcance 3",
          "meta": 30,
          "tipos": [
            {
              "nombre": "Actividad Agropecuaria",
              "meses": null,
              "subTipos": [
                {
                  "nombre": "Transporte (Km)",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Bus local",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Taxi",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                },
                {
                  "nombre": "Alimentos (Kg)",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Carne res",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Carne cerdo",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                }
              ]
            },
            {
              "nombre": "Residuos",
              "meses": null,
              "subTipos": [
                {
                  "nombre": "Incineración",
                  "meses": null,
                  "subTipoInferior": [
                    {
                      "nombre": "Lodos residuos líquidos domésticos",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    },
                    {
                      "nombre": "Lodos residuos líquidos industriales",
                      "meses": {
                        "febrero": 22,
                        "noviembre": 34
                      }
                    }
                  ]
                },
                {
                  "nombre": "Quema a cielo abierto controlada rural",
                  "meses": {
                    "febrero": 22,
                    "noviembre": 34
                  }
                },
                {
                  "nombre": "Relleno Sanitario gestionado anaeróbico",
                  "meses": {
                    "febrero": 22,
                    "noviembre": 34
                  }
                }
              ]
            }
          ]
        }
      ]
    }
    const flattenJSON = (data, parentPath = '') => {
      let flattenedData = [];

      for (const key in data) {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
          flattenedData.push(...flattenJSON(data[key], parentPath + key + '::'));
        } else {
          flattenedData.push({
            key: parentPath + key,
            value: data[key]
          });
        }
      }

      return flattenedData;
    };

    const transformedData = main.map(item => {
      const transformedItem = {
        id: item.principalId,
        empresa: item.empresa,
        planta: item.planta,
        ubicacion: item.ubicacion,
        año: item.año
      };

      item.Alcances.forEach(alcance => {
        transformedItem[`${alcance.nombre}`] = {};
        transformedItem[`${alcance.nombre}`].meta = alcance.meta
        alcance.Tipos.forEach(tipo => {
          const tipoObj = {};
          tipo.SubTipos.forEach(subTipo => {
            const subTipoObj = {};
            subTipo.SubTipoInferiors.forEach(subTipoInferior => {
              const subTipoInferiorObj = {};
              subTipoInferior.ValorSubTipoInferiors.forEach(valor => {
                subTipoInferiorObj[valor.mes] = valor.valor;
              });
              subTipoObj[subTipoInferior.nombre] = subTipoInferiorObj;
            });
            tipoObj[subTipo.nombre] = subTipoObj;
            if(subTipo.ValorSubTipos) {
              subTipo.ValorSubTipos.forEach(valor => {
                subTipoObj[valor.mes] = valor.valor;
              });
            }
          });
          if(tipo.ValorTipos) {
            tipo.ValorTipos.forEach(valor => {
              tipoObj[valor.mes] = valor.valor;
            });
          }
          transformedItem[`${alcance.nombre}`][tipo.nombre] = tipoObj;
        });
      });

      return transformedItem;
    });


    console.log(transformedData);

    console.log("==========================================================================")
    console.log(flattenJSON(data))

    res.status(200).json(transformedData)
    // res.status(200).json(transformedData);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

const newData = async (req, res) => {
  try {
    const data = req.body;
    await sequelize.transaction(async (t) => {

      const main = await Main.create({
        empresa: data.empresa,
        planta: data.planta,
        ubicacion: data.ubicacion,
        año: data.año,
      });


      if (data.alcances && main.principalId) {
        for (const scope of data.alcances) {

          const scopeRecord = await Scope.create({
            nombre: scope.nombre,
            meta: scope.meta,
            principalId: main.principalId,
          });

          if (scope.tipos && scopeRecord.alcanceId) {

            for (const type of scope.tipos) {

              const typeRecord = await Type.create({
                nombre: type.nombre,
                alcanceId: scopeRecord.alcanceId,
              });

              if (type.meses) {
                for (const month in type.meses) {
                  const monthNameType = month;
                  const monthValueType = type.meses[monthNameType];

                  const [monthRecord, created] = await Month.findOrCreate({
                    where: { nombre: monthNameType },
                    defaults: { nombre: monthNameType }
                  });

                  await TypeValue.create({
                    mes: monthNameType,
                    valor: monthValueType,
                    tipoId: typeRecord.tipoId
                  })
                }
              }

              if (type.subTipos && typeRecord.tipoId) {
                for (const subType of type.subTipos) {

                  const subTypeRecord = await SubType.create({
                    nombre: subType.nombre,
                    tipoId: typeRecord.tipoId,
                  });

                  if (subType.meses) {
                    for (const month in subType.meses) {

                      const monthNameSubType = month
                      const monthValueSubType = subType.meses[monthNameSubType]

                      const monthRecord = await Month.findOne({
                        where: { nombre: monthNameSubType },
                      });

                      await SubTypeValue.create({
                        mes: monthNameSubType,
                        valor: monthValueSubType,
                        subTipoId: subTypeRecord.subTipoId
                      })
                    }
                  }

                  if (subType.subTipoInferior && subTypeRecord.subTipoId) {
                    for (const subTypeInferior of subType.subTipoInferior) {
                      const subTypeInferiorRecord = await SubTypeInferior.create({
                        nombre: subTypeInferior.nombre,
                        subTipoId: subTypeRecord.subTipoId,
                      });

                      if (subTypeInferior.meses) {
                        for (const month in subTypeInferior.meses) {

                          const monthNameSubTypeInferior = month
                          const monthValueSubTypeInferior = subTypeInferior.meses[monthNameSubTypeInferior]

                          await SubTypeInferiorValue.create({
                            mes: monthNameSubTypeInferior,
                            valor: monthValueSubTypeInferior,
                            subTipoInferiorId: subTypeInferiorRecord.subTipoInferiorId
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    res.status(200).json({ message: 'Datos agregados correctamente' });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};





module.exports = { createTables, getAll, newData };
