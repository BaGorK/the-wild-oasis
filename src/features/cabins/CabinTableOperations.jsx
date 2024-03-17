import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterFieldName='discount'
        options={[
          { value: 'all', lable: 'All' },
          { value: 'no-discount', lable: 'No discount' },
          { value: 'with-discount', lable: 'With discount' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
