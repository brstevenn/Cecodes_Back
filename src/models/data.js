var mongoose = require('mongoose');

const fechas = mongoose.Schema({
  enero: { type: String },
  febrero: { type: String },
  marzo: { type: String },
  abril: { type: String },
  mayo: { type: String },
  junio: { type: String },
  julio: { type: String },
  agosto: { type: String },
  septiembre: { type: String },
  octubre: { type: String },
  noviembre: { type: String },
  diciembre: { type: String },
});

const DataSchema = mongoose.Schema(
  {
    ubicacion: {
      type: String,
      required: false,
      trim: true,
    },
    año: {
      type: String,
      required: false,
      trim: true,
    },
    planta: {
      type: String,
      required: false,
      trim: true,
    },
    empresa: {
      type: String,
      required: false,
      trim: true,
    },
    combustibles: {
      carbon: { name: String, fechas },
      lena: { name: String, fechas },
      biodiesel: { name: String, fechas },
      diesel: { name: String, fechas },
      gasolina: { name: String, fechas },
      kerosene: { name: String, fechas },
      biogas: { name: String, fechas },
      gasNatural: { name: String, fechas },
      glp: { name: String, fechas },
    },
    emisionesFugitivas: {
      aguasResidualesDomesticas: {
        vertimientosDomesticosCloaca: fechas,
        vertimientosDomesticos1: fechas,
        vertimientosDomesticos2: fechas,
        vertimientosDomesticos3: fechas,
        vertimientosDomesticos4: fechas,
        vertimientosDomesticos5: fechas,
      },
      aguasResidualesIndustriales: {
        vertimientosDomesticos1: fechas,
        vertimientosDomesticos2: fechas,
        vertimientosDomesticos3: fechas,
        vertimientosDomesticos4: fechas,
      },
      lodos: {
        organicosDomesticos: fechas,
        organicosIndustriales: fechas,
      },
      otrasEmisiones: {
        aireMovil: fechas,
        aireResidencial: fechas,
        congeladores: fechas,
        refrigeracionComercial: fechas,
        refrigeracionIndustrial: fechas,
        refrigerantesDomesticos: fechas,
        transporteRefrigerado: fechas,
      },
    },
    gasesRefrigerantes: {
      CH3Br: { name: String, fechas },
      CCI3F: { name: String, fechas },
      CHCI3: { name: String, fechas },
      Halon: { name: String, fechas },
      HCFC: { name: String, fechas },
      HFE: { name: String, fechas },
      CCI4: { name: String, fechas },
      SF5CF3: { name: String, fechas },
      NF3: { name: String, fechas },
    },
    electricidad: fechas,
    hidroelectrica: fechas,
    solar: fechas,
    eolica: fechas,
    actividadAgropecuaria: {
      transporte: {
        bus: fechas,
        taxi: fechas,
        tren: fechas,
        vueloDomestico: fechas,
        vueloLargo: fechas,
      },
      alimentos: {
        res: fechas,
        cerdo: fechas,
        cordero: fechas,
        queso: fechas,
        huevos: fechas,
        arroz: fechas,
        leche: fechas,
      },
      fermentacion_enterica: {
        bufalos: fechas,
        caballos: fechas,
        cabras: fechas,
        cerdos: fechas,
        conejos: fechas,
        lechero: fechas,
        noLechero: fechas,
        mulas: fechas,
        ovejas: fechas,
        pollos: fechas,
      },
      manejo_de_estiercol: {
        aves: { name: String, fechas },
        bufalos: { name: String, fechas },
        cabras: { name: String, fechas },
        cerdos: { name: String, fechas },
        lechero: { name: String, fechas },
        noLechero: { name: String, fechas },
        ovejas: { name: String, fechas },
      },
      otras: {
        cal: { name: String, fechas },
        compostaje: { name: String, fechas },
        digestion: { name: String, fechas },
        fertilizacion: { name: String, fechas },
        quema: { name: String, fechas },
        fertilizantes: { name: String, fechas },
      },
    },
    residuos: {
      incineracion: {
        lodosLiquidosDomesticos: fechas,
        lodosLiquidosIndustriales: fechas,
        residuosFosilesLiquidos: fechas,
        residuosHospitalarios: fechas,
        residuosIndustriales: fechas,
        residuosOrdinarios: fechas,
      },
      quemaControladaRural: fechas,
      rellenoSanitarioAnaerobico: fechas,
      rellenoSanitarioSemiAnaerobico: fechas,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;
