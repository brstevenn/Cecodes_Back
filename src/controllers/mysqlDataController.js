const sequelize = require('../config/dbMysql');
const { Main, Scope, Values, Month } = require('../models/relations');


const createTables = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader === "s1qu3s1") {
      await sequelize.sync({ alter: true });

      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

      for (const nombreMes of meses) {
        await Month.create({ nombre: nombreMes });
      }

      res.json({ message: 'Tablas creadas exitosamente' });
    } else {
      throw new Error("No tienes permisos")
    }

  } catch (error) {
    console.error('Error', error);
    res.status(500).json(`${error}`);
  }
};


const getAll = async (req, res) => {
  try {
    let data = []
    await sequelize.transaction(async (t) => {
      data = await Main.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Scope,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'alcanceId', 'principalId']
            }
          },
          {
            model: Values,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'alcanceId', 'principalId']
            },
            include: [
              {
                model: Month,
                as: 'Month',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'valueId']
                },
              }
            ]
          }
        ]
      });
    })
    res.status(200).json(data);
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
          console.log("=============================================================")
          console.log(scope.meta > 0 ? scope.meta : 0)
          console.log("=============================================================")
          const scopeRecord = await Scope.create({
            nombre: scope.nombre,
            meta: scope.meta > 0 ? scope.meta : 0,
            principalId: main.principalId,
          });

          if (scope.tipos) {

            for (const type of scope.tipos) {

              if (type.meses) {

                for (const month in type.meses) {
                  const monthNameType = month;
                  const monthValueType = type.meses[monthNameType];

                  const monthRecord = await Month.findOne({
                    where: { nombre: monthNameType }
                  });

                  await Values.create({
                    mesId: monthRecord.mesId,
                    nombre: type.nombre,
                    valor: monthValueType,
                    alcanceId: scopeRecord.alcanceId,
                    principalId: main.principalId
                  });

                }
              }

              if (type.subTipos) {
                for (const subType of type.subTipos) {

                  if (subType.meses) {
                    for (const month in subType.meses) {

                      const monthNameSubType = month
                      const monthValueSubType = subType.meses[monthNameSubType]

                      const monthRecord = await Month.findOne({
                        where: { nombre: monthNameSubType },
                      });

                      await Values.create({
                        mesId: monthRecord.mesId,
                        nombre: subType.nombre,
                        valor: monthValueSubType,
                        alcanceId: scopeRecord.alcanceId,
                        principalId: main.principalId
                      });
                    }
                  }

                  if (subType.subTipoInferior) {
                    for (const subTypeInferior of subType.subTipoInferior) {

                      if (subTypeInferior.meses) {
                        for (const month in subTypeInferior.meses) {

                          const monthNameSubTypeInferior = month
                          const monthValueSubTypeInferior = subTypeInferior.meses[monthNameSubTypeInferior]

                          const monthRecord = await Month.findOne({
                            where: { nombre: monthNameSubTypeInferior },
                          });

                          await Values.create({
                            mesId: monthRecord.mesId,
                            nombre: subTypeInferior.nombre,
                            valor: monthValueSubTypeInferior,
                            alcanceId: scopeRecord.alcanceId,
                            principalId: main.principalId
                          });

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