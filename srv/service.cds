using {com.re.masterdata.db as db} from '../db/schema';


service MyService {

    entity CommodityMaster as projection on db.CommodityMaster;
    entity RawMaterialMaster as projection on db.RawMaterialMaster;
    entity RawMaterialAssignment as projection on db.RawMaterialAssignment;
    entity MaterialCostingSheet as projection on db.MaterialCostingSheet;

}
