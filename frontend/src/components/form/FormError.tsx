import styled from 'styled-components';

const FormError = styled.div`
  color: ${({ theme }) => theme.colors.onDanger};
  background: ${({ theme }) => theme.colors.dangerDarker};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 5px;
  width: auto;
  height: auto;
  margin-top: 10px;
  padding: 5px 10px;
  font-family: ${({ theme }) => theme.fonts.altFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
`;

export default FormError;
