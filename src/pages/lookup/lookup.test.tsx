import userEvent from "@testing-library/user-event";
import type {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render, waitFor} from "@testing-library/react";
import {Lookup} from "./Lookup";


function renderWithClient(ui: ReactNode) {
    const client = new QueryClient();

    return render(
        <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    )
}

describe("Lookup Page", () => {
    test("renders title and Add button", () => {
        const {getByText} = renderWithClient(<Lookup/>);

        expect(getByText("IP Lookup")).toBeInTheDocument();
        expect(getByText("Add")).toBeInTheDocument();
    });

    test("add new row when clicking Add button", async () => {
        const {getByText, getAllByPlaceholderText} = renderWithClient(<Lookup/>);
        const addBtn = getByText("Add");

        expect(getAllByPlaceholderText("Enter IP")).toHaveLength(1);

        await userEvent.click(addBtn);

        expect(getAllByPlaceholderText("Enter IP")).toHaveLength(2);
    });

    test("clears result and error when input becomes empty", async () => {
        const { getByPlaceholderText, findByAltText, queryByText } = renderWithClient(<Lookup />);

        const input = getByPlaceholderText("Enter IP");

        await userEvent.type(input, "8.8.8.8");
        await userEvent.tab();

        const flag = await findByAltText("Flag of Brazil");

        expect(flag).toBeInTheDocument();

        await userEvent.clear(input);
        await userEvent.tab();

        expect(flag).not.toBeInTheDocument();
        expect(queryByText(/23:00/)).not.toBeInTheDocument();
        expect(queryByText("Invalid IP address")).not.toBeInTheDocument();
    });

    test("fetch IP info on blur and show flag and time", async () => {
        const {getByPlaceholderText, findByAltText, findByText} = renderWithClient(<Lookup/>);

        const input = getByPlaceholderText("Enter IP");

        await userEvent.type(input, "8.8.8.8");
        await userEvent.tab();

        expect(input).toBeDisabled();

        const flag = await findByAltText("Flag of Brazil");

        expect(flag).toBeInTheDocument();

        await findByText(/23:00/);

        expect(input).not.toBeDisabled();
    });

    test("handles two simultaneous IP lookups independently", async () => {
        const { getByText, getAllByPlaceholderText, findAllByAltText } = renderWithClient(<Lookup />);

        const addBtn = getByText("Add");

        await userEvent.click(addBtn);

        const inputs = getAllByPlaceholderText("Enter IP");
        const input1 = inputs[0];
        const input2 = inputs[1];

        await userEvent.type(input1, "8.8.8.8");
        await userEvent.tab();

        expect(input1).toBeDisabled();

        await userEvent.type(input2, "8.8.8.8");
        await userEvent.tab();

        expect(input2).toBeDisabled();

        await waitFor(() => {
            expect(input1).not.toBeDisabled();
            expect(input2).not.toBeDisabled();
        });

        const flags = await findAllByAltText("Flag of Brazil");

        expect(flags).toHaveLength(2);
    });

    test("shows error for invalid IP", async () => {
        const {getByPlaceholderText, findByText} = renderWithClient(<Lookup/>)
        const input = getByPlaceholderText("Enter IP");

        await userEvent.type(input, "invalid");
        await userEvent.tab();

        expect(await findByText("Invalid IP address")).toBeInTheDocument();
    });
});