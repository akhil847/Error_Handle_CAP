using CatalogService as service from '../../srv/errorlog-service';

// annotate service.TotalErrorsSingle with @(
//   UI.LineItem: [
//     { Value: count, Label: 'All Errors' },
//     { Value: ID, Label: 'Key' }
//   ]
// );


// annotate service.ErrorLogAggregates with @(
//   UI.DataPoint #TotalErrors: {
//     Value: count,
//     Title: 'Total Errors'
//   }
// );

// annotate service.ErrorLogAggregates with @(
//   UI.PresentationVariant: {
//     Visualizations: [{
//       $Type: 'UI.DataPoint',
//       Title: 'Total Errors',
//       Value: count
//     }]
//   }
// )