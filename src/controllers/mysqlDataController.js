const sequelize = require('../config/dbMysql');
const { Main, Scope, Type, SubType, SubTypeInferior, Month, MonthLog } = require('../models/relations');
const SubTypeInferiorValue = require('../models/subTypeInferiorValue');
const SubTypeValue = require('../models/subTypeValue');
const TypeValue = require('../models/typeValue');


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
    await sequelize.transaction(async (t) => {
      await Main.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'] // Excluir los campos de fecha de creación y actualización
        },
        include: [
          {
            model: Scope,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'id', 'PrincipalId'] // Excluir los campos de fecha de creación y actualización
            },
            include: [
              {
                model: Type,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'id', 'AlcanceId'] // Excluir los campos de fecha de creación y actualización
                },
                include: [
                  {
                    model: SubType,
                    attributes: {
                      exclude: ['createdAt', 'updatedAt', 'id', "TipoId"] // Excluir los campos de fecha de creación y actualización
                    },
                    include: [
                      {
                        model: SubTypeInferior,
                        attributes: {
                          exclude: ['createdAt', 'updatedAt', 'id', "SubTipoId"] // Excluir los campos de fecha de creación y actualización
                        },
                        include: [
                          {
                            model: MonthLog,
                            attributes: {
                              exclude: ['createdAt', 'updatedAt', 'id', "SubTipoId", "PrincipalId", "AlcanceId", "TipoId"]
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    })
    res.status(200).json({ message: 'Datos agregados correctamente' });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

/*
const newData = async (req, res) => {
  const addDataRecursively = async (data, parentIds = {}) => {
    try {
      // Crear registro en la tabla Main
      const main = await Main.create({
        empresa: data.empresa,
        planta: data.planta,
        ubicacion: data.ubicacion,
        año: data.año,
      });

      const setMonth = async (dataKey, dataId, monthName, monthValue) => {
        try {
          await MonthLog.create({
            value: monthValue,
            mes: monthName,
            [dataKey]: dataId
          }, { ignoreDuplicates: true });
        } catch (error) {
          console.error('Error al agregar los datos:', error);
          throw error;
        }
      };

      // Recorrer los alcances
      for (const scope of data.alcances) {
        // Crear registro en la tabla Scope
        const scopeRecord = await Scope.create({
          nombre: scope.nombre,
          meta: scope.meta,
          ...parentIds,
        });

        if (scope.tipos) {
          for (const type of scope.tipos) {
            // Crear registro en la tabla Type
            const typeRecord = await Type.create({
              nombre: type.nombre,
              ...parentIds,
            });

            if (type.meses) {
              for (const month in type.meses) {
                const monthNameType = month;
                const monthValueType = type.meses[monthNameType];

                const [monthRecord] = await Month.findOrCreate({
                  where: { nombre: monthNameType },
                  defaults: { nombre: monthNameType }
                });

                await setMonth("tipoId", typeRecord.tipoId, monthNameType, monthValueType);
              }
            }

            if (type.subTipos) {
              for (const subType of type.subTipos) {
                // Crear registro en la tabla SubType
                const subTypeRecord = await SubType.create({
                  nombre: subType.nombre,
                  ...parentIds,
                });

                if (subType.meses) {
                  for (const month in subType.meses) {
                    const monthNameSubType = month;
                    const monthValueSubType = subType.meses[monthNameSubType];

                    const monthRecord = await Month.findOne({
                      where: { nombre: monthNameSubType },
                    });

                    await setMonth("subTipoId", subTypeRecord.subTipoId, monthNameSubType, monthValueSubType);
                  }
                }

                if (subType.subTipoInferior) {
                  for (const subTypeInferior of subType.subTipoInferior) {
                    // Crear registro en la tabla SubTypeInferior
                    const subTypeInferiorRecord = await SubTypeInferior.create({
                      nombre: subTypeInferior.nombre,
                      ...parentIds,
                    });

                    if (subTypeInferior.meses) {
                      for (const month in subTypeInferior.meses) {
                        await setMonth("subTipoInferiorId", subTypeInferiorRecord.subTipoInferiorId, month, subTypeInferior.meses[month]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error al agregar los datos:', error);
      throw error;
    }
  };

  const data = req.body;
  addDataRecursively(data)
    .then(() => {
      console.log('Datos agregados correctamente');
    })
    .catch((error) => {
      console.error('Error al agregar los datos:', error);
    });
}
*/


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

      const setMonth = async (dataKey, dataId, monthName, monthValue) => {
        try {
          await MonthLog.create({
            value: monthValue,
            mes: monthName,
            [dataKey]: dataId
          }, { ignoreDuplicates: true });

        } catch (error) {
          console.error('Error al agregar los datos:', error);
          throw error;
        }
      };

      if(data.alcances && main.principalId) {
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
  
                  // await setMonth("tipoId", typeRecord.tipoId, monthNameType, monthValueType);
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
  
                      //if (monthRecord) {
                      // await setMonth("subTipoId", subTypeRecord.subTipoId, monthNameSubType, monthValueSubType)
                      //}
                    }
                  }
  
                  if (subType.subTipoInferior  && subTypeRecord.subTipoId) {
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
                          // await setMonth("subTipoInferiorId", subTypeInferiorRecord.subTipoInferiorId, month, subTypeInferior.meses[month])
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
  /*
    try {
  
  
  
      const main = await Main.create({
        empresa: data.empresa,
        planta: data.planta,
        ubicacion: data.ubicacion,
        año: data.año,
      });
  
      const setMonth = async (dataKey, dataId, monthName, monthValue) => {
        try {
          await MonthLog.create({
            value: monthValue,
            mes: monthName,
            [dataKey]: dataId
          }, { ignoreDuplicates: true });
  
        } catch (error) {
          console.error('Error al agregar los datos:', error);
          throw error;
        }
      };
  
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
  
                await setMonth("tipoId", typeRecord.tipoId, monthNameType, monthValueType);
              }
            }
  
            if (type.subTipos && typeRecord.subTipoId) {
              for (const subType of type.subTipos) {
  
                console.log("===================Pasando typeRecord=====================")
                console.log(typeRecord.tipoId)
                console.log("========================================================")
  
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
  
                    //if (monthRecord) {
                      await setMonth("subTipoId", subTypeRecord.subTipoId, monthNameSubType, monthValueSubType)
                    //}
                  }
                }
  
                console.log("===================Pasando subtype=====================")
                console.log(subTypeRecord.subTipoId)
                console.log("========================================================")
  
                if (subType.subTipoInferior) {
                  for (const subTypeInferior of subType.subTipoInferior) {
                    const subTypeInferiorRecord = await SubTypeInferior.create({
                      nombre: subTypeInferior.nombre,
                      subTipoId: subTypeRecord.subTipoId,
                    });
  
                    console.log("===============Pasando subtypeinferior==================")
                    console.log(subTypeInferiorRecord.subTipoId)
                    console.log("========================================================")
  
                    if (subTypeInferior.meses) {
                      for (const month in subTypeInferior.meses) {
                        await setMonth("subTipoInferiorId", subTypeInferiorRecord.subTipoInferiorId, month, subTypeInferior.meses[month])
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      res.status(200).json({ message: 'Datos agregados correctamente' });
    } catch (error) {
      console.error('Error al agregar los datos:', error);
      res.status(500).json({ error: 'Error al agregar los datos' });
    }
    */
};





module.exports = { createTables, getAll, newData };
