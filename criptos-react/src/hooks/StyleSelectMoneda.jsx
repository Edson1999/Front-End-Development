import styled from '@emotion/styled';

/* The code `const Label = styled.label` is creating a styled component using the `styled` function
from the `@emotion/styled` library. */
const Label = styled.label`
  color: white;
  display: block;
  font-size: 2rem;
  margin: 1.6rem 0;
`;

/* The code `const Select = styled.select` is creating a styled component using the `styled` function
from the `@emotion/styled` library. It is styling a `<select>` element with the following CSS
properties: */
const Select = styled.select`
  width: 100%;
  font-size: 1.6rem;
  font-family: 'Canaro', sans-serif;
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
`;

export { Label, Select };
