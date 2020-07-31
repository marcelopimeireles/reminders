import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid white;
    width: 100%;
    min-height: 50vh;
    background-color: rgba(255, 255, 255, 0.6);
`;

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
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    justify-content: space-around;
    line-height: 30px;
`;
