import { PageBox, PageContent } from "./style";
import NavBar from "../Navbar";


interface Props {
  children: React.ReactNode;
  exibirMenuNavegacao: boolean;
}

export default function Template(props: Props) {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="container rounded-sm mt-2 flex justify-center items-center" style={{ marginLeft: "24rem" }}>
            <PageBox>
              <PageContent>{props.children}</PageContent>
            </PageBox>
          </div>
        </div>
      </div>
    </>
  );
}