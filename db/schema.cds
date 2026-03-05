namespace com.re.masterdata.db;

entity CommodityMaster {
    key commodityCode        : String(10);
        commodityDescription : String(100);
        rawMaterialMaster    : Composition of many RawMaterialMaster
                                   on rawMaterialMaster.commodityCode = $self;
}

entity RawMaterialMaster {
    key rawMaterialCode        : String(10);
        rawMaterialDescription : String(100);

        rawMaterialAssignment    : Composition of many RawMaterialAssignment
                                   on rawMaterialAssignment.rawMaterialMaster = $self;

        commodityCode          : Association to CommodityMaster;
}

entity RawMaterialAssignment {
    key ID             : UUID;

        vendor         : String(10);
        plant          : String(10);
        material       : String(20);

        rawMaterialMaster    : Association to RawMaterialMaster;

        rawMaterialUOM : String(10);
        rawMaterialQty : Decimal(13, 3);
}

entity MaterialCostingSheet {
    key ID             : UUID;

        vendor         : String(10);
        plant          : String(10);
        material       : String(20);

        costComponent  : String(20);

        rawMaterialUOM : String(10);
        rawMaterialQty : Decimal(13, 3);
}
