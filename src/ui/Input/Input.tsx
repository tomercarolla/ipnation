import styled from "@emotion/styled";

export const Input = styled.input`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #CCC;
    border-radius: 6px;
    font-size: 14px;
    
    &:focus {
        border-color: #3AA6F5;
        box-shadow: 0 0 0 2px rgba(58, 166, 245, 0.3);
    }
    
    &:disabled {
        background-color: #F5F5F5;
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: #AAA;
    }
`;