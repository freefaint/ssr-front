/**
 * Содержит идентификаторы всех элементов-индикаторов.
 */
export const ElementIds = {
    // Factory
    FACTORY_BUNKER_NZ: 'factory_bunkerNz',
    FACTORY_BUNKER_UP: 'factory_bunkerUp',
    FACTORY_BUNKER_SD_FEEDER: 'factory_bunkerSdFeeder',
    FACTORY_BUNKER_MD_FEEDER: 'factory_bunkerMdFeeder',
    FACTORY_SHIPMENT_TO_ROCK_WAREHOUSE: 'factory_shipmentToRockWarehouse',
    FACTORY_SHIPMENT_TO_FACTORY: 'factory_shipmentToFactory',
    FACTORY_DOMAIN_PIECE: 'factory_domainPiece',
    FACTORY_SHIPMENT_SINTER_ORE: 'factory_shipmentSinterOre',
    FACTORY_VIBRA_SCREEN_SD: 'factory_vibraScreenSd',
    FACTORY_VIBRA_SCREEN_MD: 'factory_vibraScreenMd',
    FACTORY_SD1_PROCESSING_RATE_CELL: 'factory_sd1ProcessingRateCell',
    FACTORY_SD4_PROCESSING_RATE_CELL: 'factory_sd4ProcessingRateCell',
    FACTORY_MD3_PROCESSING_RATE_CEL: 'factory_md3ProcessingRateCell',
    FACTORY_CONVEYOR_P24: 'factory_conveyorP24',
    FACTORY_CONVEYOR_LK1: 'factory_conveyorLk1',
    FACTORY_CONVEYOR_P6: 'factory_conveyorP6',
    FACTORY_CONVEYOR_LK2: 'factory_conveyorLk2',
    FACTORY_CONVEYOR_SD1: 'factory_conveyorSd1',
    FACTORY_CONVEYOR_SD_FEEDER: 'factory_conveyorSdFeeder',
    FACTORY_CONVEYOR_SD_4: 'factory_conveyorSd4',
    FACTORY_CONVEYOR_MD_FEEDER: 'factory_conveyorMdFeeder',
    FACTORY_CONVEYOR_MD_3: 'factory_conveyorMd3',
    FACTORY_CONVEYOR_ELEVATOR: 'factory_conveyorElevator',
    FACTORY_CONVEYOR_MD6: 'factory_conveyorMd6',
    // GasPistonPowerPlant
    GAS_PISTON_POWER_PLANT_GPA1: 'ГПА-1',
    GAS_PISTON_POWER_PLANT_GPA2: 'ГПА-2',
    POWER_BALANCE: 'power_balance',
    // OreDryingComplex
    ODC_MOBILE_CONVEYORS: 'odc_mobileConveyors',
    ODC_HUMIDITY_ON_TOP: 'odc_humidityOnTop',
    ODC_HUMIDITY_ON_BOTTOM_LEFT: 'odc_humidityOnBottomLeft',
    ODC_HUMIDITY_ON_BOTTOM_RIGHT: 'odc_humidityOnBottomRight',
    ODC_KL5_PROCESSING_RATE_CEL: 'odc_kl5ProcessingRateCell',
    ODC_1B1_PROCESSING_RATE_CEL: 'odc_1b1ProcessingRateCell',
    ODC_2B1_PROCESSING_RATE_CEL: 'odc_2b1ProcessingRateCell',
    ODC_1SB_1: 'odc_1sb_1',
    ODC_2SB_1: 'odc_2sb_1',
    ODC_1VD_1: 'odc_1vd_1',
    ODC_2VD_1: 'odc_2vd_1',
    ODC_ACCEPTED_ON_KSR: 'odc_acceptedOnKsr',
    ODC_SHIPPED_TO_WAREHOUSE: 'odc_shippedToWarehouse',
    ODC_PP_1: 'odc_pp_1',
    ODC_KL_5: 'odc_kl_5',
    ODC_KL_5_1: 'odc_kl_5_1',
    ODC_KL_6_1: 'odc_kl_6_1',
    ODC_1B_1: 'odc_1b_1',
    ODC_2B_1: 'odc_2b_1',
    ODC_B_2: 'odc_b_2_overload',
    ODC_B_3: 'odc_b_3_overload',
    // Vesp
    VESP: 'vesp',
    // ShipmentStorageComplex
    SHIPMENT_STORAGE_COMPLEX_MOBILE_CONVEYORS: 'shipmentStorageComplex_mobileConveyors',
    SHIPMENT_STORAGE_COMPLEX_KL_6_2: 'shipmentStorageComplex_kl_6_2',
    SHIPMENT_STORAGE_COMPLEX_KL_6_3: 'shipmentStorageComplex_kl_6_3',
    SHIPMENT_STORAGE_COMPLEX_KL_3_1: 'shipmentStorageComplex_kl_3_1',
    SHIPMENT_STORAGE_COMPLEX_PP_2: 'shipmentStorageComplex_pp_2',
    SHIPMENT_STORAGE_COMPLEX_KL_2: 'shipmentStorageComplex_kl_2',
    SHIPMENT_STORAGE_COMPLEX_KL_3_2: 'shipmentStorageComplex_kl_3_2',
    SHIPMENT_STORAGE_COMPLEX_B_5_1_B_5_2: 'shipmentStorageComplex_b_5_1_b_5_2',
    SHIPMENT_STORAGE_COMPLEX_B_5_3_B_5_4: 'shipmentStorageComplex_b_5_3_b_5_4',
    SHIPMENT_STORAGE_COMPLEX_B_5_5_B_5_6: 'shipmentStorageComplex_b_5_5_b_5_6',
    SHIPMENT_STORAGE_COMPLEX_B_5_7_B_5_8: 'shipmentStorageComplex_b_5_7_b_5_8',
    SHIPMENT_STORAGE_COMPLEX_B_5_9_B_5_10: 'shipmentStorageComplex_b_5_9_b_5_10',
    SHIPMENT_STORAGE_COMPLEX_B_5_11_B_5_12: 'shipmentStorageComplex_b_5_11_b_5_12',
    SHIPMENT_STORAGE_COMPLEX_B_5_13_B_5_14: 'shipmentStorageComplex_b_5_13_b_5_14',
    SHIPMENT_STORAGE_COMPLEX_B_5_15_B_5_16: 'shipmentStorageComplex_b_5_15_b_5_16',
    SHIPMENT_STORAGE_COMPLEX_B_5_17_B_5_18: 'shipmentStorageComplex_b_5_17_b_5_18',
    SHIPMENT_STORAGE_COMPLEX_B_5_19_B_5_20: 'shipmentStorageComplex_b_5_19_b_5_20',
    SHIPMENT_STORAGE_COMPLEX_B_6_1_1: 'shipmentStorageComplex_b_6_1_1',
    SHIPMENT_STORAGE_COMPLEX_B_6_1_2: 'shipmentStorageComplex_b_6_1_2',
    SHIPMENT_STORAGE_COMPLEX_B_6_1_3: 'shipmentStorageComplex_b_6_1_3',
    SHIPMENT_STORAGE_COMPLEX_RAILWAY_CARRIAGE_WEIGHT_6_1: 'shipmentStorageComplex_railwayCarriageWeight_6_1',
    SHIPMENT_STORAGE_COMPLEX_B_6_2_1: 'shipmentStorageComplex_b_6_2_1',
    SHIPMENT_STORAGE_COMPLEX_B_6_2_2: 'shipmentStorageComplex_b_6_2_2',
    SHIPMENT_STORAGE_COMPLEX_B_6_2_3: 'shipmentStorageComplex_b_6_2_3',
    SHIPMENT_STORAGE_COMPLEX_RAILWAY_CARRIAGE_WEIGHT_6_2: 'shipmentStorageComplex_railwayCarriageWeight_6_2',
    SHIPMENT_STORAGE_COMPLEX_KL_2_PROCESSING_RATE_CEL: 'shipmentStorageComplex_kl_2_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_1_1_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_1_1_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_1_2_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_1_2_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_1_3_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_1_3_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_2_1_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_2_1_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_2_2_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_2_2_ProcessingRateCell',
    SHIPMENT_STORAGE_COMPLEX_B6_2_3_CELL_PROCESSING_RATE: 'shipmentStorageComplex_b6_2_3_ProcessingRateCell',
    // SurfaceStowingComplex
    CEMENT_BUNKER_PZK1_1: 'cement_bunker_pzk1_1',
    CEMENT_BUNKER_PZK1_2: 'cement_bunker_pzk1_2',
    CEMENT_BUNKER_PZK1_3: 'cement_bunker_pzk1_3',
    CEMENT_BUNKER_PZK1_4: 'cement_bunker_pzk1_4',
    CEMENT_BUNKER_PZK1_5: 'cement_bunker_pzk1_5',
    CEMENT_BUNKER_PZK1_6: 'cement_bunker_pzk1_6',
    DISPENSER_PZK1_1: 'dispenser_pzk1_1',
    DISPENSER_PZK1_2: 'dispenser_pzk1_2',
    DISPENSER_PZK1_3: 'dispenser_pzk1_3',
    PZK1_PRESSURE_WELL_1: 'pzk1_pressure_well_1',
    PZK1_PRESSURE_WELL_2: 'pzk1_pressure_well_2',
    PZK1_PRESSURE_WELL_3: 'pzk1_pressure_well_3',
    PZK1_COMMON_CONVEYOR: 'pzk1_commonConveyor',
    PZK1_CELL_PROCESSING_RATE: 'pzk1_cellProcessingRate',
    PZK1_CELL_PROCESSING_RATE_SHIPMENT: 'pzk1_cellProcessingRateShipment',
    CEMENT_BUNKER_PZK2_1: 'cement_bunker_pzk2_1',
    CEMENT_BUNKER_PZK2_2: 'cement_bunker_pzk2_2',
    CEMENT_BUNKER_PZK2_3: 'cement_bunker_pzk2_3',
    DISPENSER_PZK2_1: 'dispenser_pzk2_1',
    DISPENSER_PZK2_2: 'dispenser_pzk2_2',
    DISPENSER_PZK2_3: 'dispenser_pzk2_3',
    DISPENSER_PZK2_4: 'dispenser_pzk2_4',
    PZK2_PRESSURE_WELL_5: 'pzk2_pressure_well_5',
    PZK2_PRESSURE_WELL_6: 'pzk2_pressure_well_6',
    PZK2_PRESSURE_WELL_3: 'pzk2_pressure_well_3',
    PZK2_PRESSURE_WELL_4: 'pzk2_pressure_well_4',
    PZK2_COMMON_CONVEYOR: 'pzk2_commonConveyor',
    PZK2_CELL_PROCESSING_RATE: 'pzk2_cellProcessingRate',
    // UndergroundMine
    MINE_BUNKER_1: 'mineBunker_1',
    UNDERGROUND_MINE_FUNNEL_1: 'undergroundMine_Funnel_1',
    UNDERGROUND_MINE_FUNNEL_2: 'undergroundMine_Funnel_2',
    MINE_BUNKER_2: 'mineBunker_2',
    UNDERGROUND_MINE_FUNNEL_3: 'undergroundMine_Funnel_3',
    UNDERGROUND_MINE_FUNNEL_4: 'undergroundMine_Funnel_4',
    UNDERGROUND_MINE_CONVEYOR_1: 'undergroundMine_Conveyor_1',
    UNDERGROUND_MINE_CONVEYOR_2: 'undergroundMine_Conveyor_2',
    UNDERGROUND_MINE_PARAMETER_1: 'undergroundMine_Parameter_1',
    MINE_BUNKER_MIXER_4БИС: 'mineBunkerMixer_4бис',
    MINE_BUNKER_MIXER_34: 'mineBunkerMixer_34',
    MINE_BUNKER_MIXER_39: 'mineBunkerMixer_39',
    MINE_BUNKER_MIXER_29: 'mineBunkerMixer_29',
    MINE_BUNKER_MIXER_30: 'mineBunkerMixer_30',
    MINE_BUNKER_MIXER_38: 'mineBunkerMixer_38',
    MINE_BUNKER_MIXER_12БИС: 'mineBunkerMixer_12бис',
    MINE_BUNKER_MIXER_33: 'mineBunkerMixer_33',
    MINE_BUNKER_MIXER_17БИС: 'mineBunkerMixer_17бис',
    MINE_BUNKER_MIXER_23: 'mineBunkerMixer_23',
    MINE_BUNKER_MIXER_19: 'mineBunkerMixer_19',
    MINE_BUNKER_MIXER_4: 'mineBunkerMixer_4',
    MINE_BUNKER_MIXER_5БИС: 'mineBunkerMixer_5бис',
    MINE_BUNKER_MIXER_5: 'mineBunkerMixer_5',
    MINE_BUNKER_MIXER_6: 'mineBunkerMixer_6',
    MINE_BUNKER_MIXER_7: 'mineBunkerMixer_7',
    MINE_BUNKER_MIXER_8: 'mineBunkerMixer_8',
    MINE_BUNKER_MIXER_36: 'mineBunkerMixer_36',
    MINE_BUNKER_MIXER_10: 'mineBunkerMixer_10',
    MINE_BUNKER_MIXER_40: 'mineBunkerMixer_40',
    MINE_BUNKER_MIXER_11: 'mineBunkerMixer_11',
    MINE_BUNKER_MIXER_26: 'mineBunkerMixer_26',
} as const;
