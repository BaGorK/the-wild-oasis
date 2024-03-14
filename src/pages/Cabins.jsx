import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddModal from '../features/cabins/AddModal';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>filter/sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddModal />
      </Row>
    </>
  );
}

export default Cabins;
