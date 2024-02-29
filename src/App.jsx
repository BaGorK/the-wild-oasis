import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: aliceblue;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild oasis</H1>
        <Button>Check in</Button>
        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
      ;
    </>
  );
}

export default App;
