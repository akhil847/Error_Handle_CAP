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

  // @UI.SelectionField        : [{position: 10}]
  @UI.editable         : true
  @title               : 'Source Payload'
  @UI.lineItem.position: 10
  Source_payload     : LargeString;

  // @UI.SelectionField        : [{position: 20}]
  @title               : 'Status Code'
  @UI.lineItem.position: 20
  Error_Code         : String;

  // @UI.SelectionField        : [{position: 30}]
  @title               : 'Error Message'
  @UI.lineItem.position: 30
  @UI.multiLineText
  Error_Msg          : LargeString;

  // @UI.SelectionField        : [{position: 40}]
  @title               : 'Message ID'
  @UI.lineItem.position: 40
  Msg_ID             : String;

  @title               : 'Correlation ID'
  @UI.lineItem.position: 50
  CorrelationID      : String;

  // @UI.SelectionField        : [{position: 50}]
  @title               : 'Integration Flow'
  @UI.lineItem.position: 60
  iFlow_name         : String;

  @title               : 'Retry count'
  @UI.lineItem.position: 70
  NumberOfRetriggers : Integer;

  @title               : 'Status'
  @UI.lineItem.position: 80
  Status             : String;


}

entity ErrorFilesSet : cuid, managed {

      // file fields
      @title: 'File Name'
      FileName : String(255);

      // @UI.Hidden: true
      Content  : LargeBinary @Core.MediaType: MIMEType;

      @title: 'File Type'
      MIMEType : String;

}
