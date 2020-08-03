import styled from 'styled-components';

export const EmptyCell = styled.div`
    display: flex;
    background: rgba(0, 0, 0, 0.025);
    margin: 2px;
    padding: 6px;
    color: #333;
    font-weight: 300;
    font-size: 1em;
    text-align: center;
    flex: 1 0 0px;
    min-width: 1.5em;
    justify-items: stretch;
`;

export const Row = styled.div`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    line-height: 30px;
`;
