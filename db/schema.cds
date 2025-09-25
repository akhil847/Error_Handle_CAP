namespace CPI_errordetails_schema;

using {
  cuid,
  managed
} from '@sap/cds/common';

// @restrict: [
//   { grant: 'READ',   to: 'error_admin' },
//   // { grant: 'CREATE', to: 'error_creator' },
//   { grant: 'UPDATE', to: 'error_admin' },
//   { grant: 'DELETE', to: 'error_admin'  }
// ]

// @Capabilities.InsertRestrictions: {Insertable: true}
// @odata.draft.enabled
// @odata.draft.bypass
// @Capabilities : { Updatable }
entity ErrorLogSet : cuid, managed {

  @UI.editable         : true
  @title               : 'Source Payload'
  @UI.lineItem.position: 10
  Source_payload     : LargeString;

  @title               : 'Status Code'
  @UI.lineItem.position: 20
  Error_Code         : String;

  @title               : 'Error Message'
  @UI.lineItem.position: 30
  @UI.multiLineText
  Error_Msg          : LargeString;

  @title               : 'Message ID'
  @UI.lineItem.position: 40
  Msg_ID             : String;

  @title               : 'Correlation ID'
  @UI.lineItem.position: 50
  CorrelationID      : String;

  @title               : 'Integration Flow'
  @UI.lineItem.position: 60
  iFlow_name         : String;

  @title               : 'Retry count'
  @UI.lineItem.position: 70
  NumberOfRetriggers : Integer;

  @title               : 'Status'
  @UI.lineItem.position: 80
  Status             : String;
  
  @title               : 'Receiver System'
  Receiver_System : String;


}

entity ErrorFilesSet : cuid, managed {

  // file fieldsa
  @UI.lineItem.position: 5
  @title               : 'File Name'
  FileName      : String(255);

  // @UI.Hidden: true
  @UI.lineItem.position: 10

  Content       : LargeBinary @Core.MediaType: MIMEType;

  @UI.lineItem.position: 15
  @title               : 'File Type'
  MIMEType      : String;

  @UI.lineItem.position: 20
  @title               : 'Error Message'
  Error_message : String;

  @UI.lineItem.position: 25
  @title               : 'Status Code'
  Error_Code    : String;

  @title               : 'Retry count'
  @UI.lineItem.position: 70
  NumberOfRetriggersofFile : Integer;

  @title               : 'Status'
  @UI.lineItem.position: 80
  Status             : String;

  @title               : 'Correlation Id'
  CorrelationID : String;

  @title               : 'Receiver System'
  Receiver_System : String;

  @title               : 'Integration Flow'
  iFlow_name         : String;

}
