import styled from "@emotion/styled";

export const Button = styled.button`
    --fill: #3AA6F5;
    --text: #FFF;
    
    all: unset;
    
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding-inline: 12px;
    padding-block: 6px;
    border-radius: 6px;
    background-color: var(--fill);
    color: var(--text);
    
    &:disabled {
        cursor: default;
        opacity: 0.6;
    }
    
    &:hover,
    &:focus {
        background-color: #3390d9;
    }
    
    &:active {
        background-color: #2d82c4;
    }
`;