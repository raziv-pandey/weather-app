export const routes = {
    MIS : {
        loadMisMonthlySalesGraph                : 'MonthlySalesReportPage',
        loadMisTopNitemValuewiseGraph           : 'TopNItemValueWiseReportPage',
        loadMisTopNitemQuantitywiseGraph        : 'TopNItemQuantityWiseReportPage',
        loadMisTopNcustValuewiseGraph           : 'TopNCustomerValueWiseReportPage',
        loadMisTopNcustQuantitywiseGraph        : 'TopNCustomerQuantityWiseReportPage',
        loadMisStateSalesQuantitywiseGraph      : 'StateSalesQuantityWiseReportPage',
        loadMisStateSalesValuewiseGraph         : 'StateSalesValueWiseReportPage',
        loadMisMainExpHeadStatusReport          : 'MainExpHeadStatusReportPage',
        loadMisGroupwiseSalesQuantitywiseGraph  : 'GroupwiseSalesQtywiseReportPage',
        loadMisGroupwiseSalesValuewiseGraph     : 'GroupwiseSalesValuewiseReportPage'   
    },
    SDMS : {
        loadSdmsCustomerWiseSalesReport         : 'CustomerWiseSalesReportPage',
        loadSdmsCollectionReport                : 'CollectionReportPage',
        loadSdmsSalesOrderItemCharges           : 'CreateSalesOrderPage',
        loadSdmsSalesInvoice                    : 'SalesInvoicePage',
        loadSdmsMobileCollectionEntry           : 'CreateCollectionPage',
        mobileCustomSdmsStockReport             : 'StockReportPage',
        loadSdmsSoStatusReport                  : 'SoStatusReportPage',
        loadSdmsMobileLicenseGeneration         : 'LicenceGenerationPage',
        loadSdmsCustomerVisitReport             : 'CvrLocationEcodePage',
        //Master - Create Customer
        listCreateCustomerMaster                : 'CreateCustomersPage'   
    },
    MMS : {
        loadCheckStockFromMobileApp             : 'CheckStockPage'
     },
    FAS : {
        loadFasLedgerQueryReport                : 'LedgerQueryReportPage',
        loadFasDebtorsAging			            : 'DebtorsAgingReportPage',
        loadFasCreditorsAging		            : 'CreditorsAgingReportPage',
        //Master - Approve Customer
       // loadFasApprovedCustomerMaster           : 'ApproveCustomersPage' 	 	
    },
    HRMS : {
        loadHrmsExpenseEntry                    : 'HrmsLocationEcodePage',
        loadHrmsEmpExpenseStatusReport          : 'EmployeeExpenseStatusReportPage',
        listHrmsRegisterPartnerEmployee         : 'RegPartnerEmployeePage',
        loadHrmsAdvanceRequest                  : 'HrmsLocationEcodePage'
    },
    ADMIN : {
        listAdminRegisterPartnerLocation        : 'RegisterPartnerLocationPage'
    },
    PQMS : {
        loadMmsWODeatilsForIprod                : 'WoDetailsPage'
    }

};