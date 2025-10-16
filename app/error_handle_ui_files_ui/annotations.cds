using CatalogService as service from '../../srv/errorlog-service';

annotate service.ErrorFilesSet with {
    createdAt  @UI.HiddenFilter: false;
    createdBy  @UI.HiddenFilter: false;
    modifiedAt @UI.HiddenFilter: false;
    modifiedBy @UI.HiddenFilter: false;
};

// annotate service.ErrorFilesSet with @(UI.DataFieldForAction: [{
//     Action     : 'reTriggerFile',
//     Label      : 'Re-Trigger File',
//     // IsMassAction: true,
//     Criticality: #Positive,
// }]);


annotate service.ErrorFilesSet with actions {
    reTriggerFile @Core.OperationAvailable: true;
};


annotate service.ErrorFilesSet with @(

      UI.HeaderInfo                 : {
        TypeName      : 'All file related issues',
        TypeNamePlural: 'All file related issues',
        Title         : {Value: '{iFlow_name}'},

    },

    UI.SelectionFields            : [
        FileName,
        MIMEType,
        createdAt,
        createdBy

    ],

    UI.FieldGroup #GeneratedGroup : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: FileName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Content',
                Value: Content,
            },
            {
                $Type: 'UI.DataField',
                Value: MIMEType,
            },
              {
                $Type: 'UI.DataField',
                Value: CorrelationID
            },
            {
                $Type: 'UI.DataField',
                Value: NumberOfRetriggersofFile
            },
            {
                $Type: 'UI.DataField',
                Value: Status
            },
            {
                $Type: 'UI.DataField',
                Value: iFlow_name
            },
            {
                $Type: 'UI.DataField',
                Value: Receiver_System
            }
        ],
    },

    UI.FieldGroup #GeneratedGroup2: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: createdBy
            },
            {
                $Type: 'UI.DataField',
                Value: createdAt
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy
            }
        ],
    },

    UI.Facets                     : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'File   Information',
            Target: '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet2',
            Label : 'User Information',
            Target: '@UI.FieldGroup#GeneratedGroup2'
        }
    ],

    UI.LineItem                   : [
        {
            $Type: 'UI.DataField',
            Value: FileName,
        },
        {
            $Type: 'UI.DataField',
            Value: Content,
        },
        {
            $Type: 'UI.DataField',
            Value: Error_message,
        },
        {
            $Type: 'UI.DataField',
            Value: Error_Code
        },
        {
            $Type: 'UI.DataField',
            Value: MIMEType,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy
        },
        // cust Btn
        {
            $Type      : 'UI.DataFieldForAction',
            Action     : 'CatalogService.reTriggerFile',
            Label      : 'Re-Trigger File',
            // IsMassAction: true,
            Criticality: #Positive,
        // Inline : true,
        }
    ],
);
