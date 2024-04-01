import { styled } from "../../../theme/config";

export const PageBox = styled("div", {
    flexDirection: "column",
    alignItems: "center",
});
export const PageContent = styled("div", {
    padding: "$6",
    minHeight: "calc(540px)",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
});

