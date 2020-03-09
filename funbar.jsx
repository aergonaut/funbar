import { styled } from "uebersicht";

const BarContainer = styled("div")`
  height: 30px;
  width: 100vw;
`;

const Bar = styled("div")`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background: black;
  margin: 5px auto;
  width: 60%;
`;

const BarItem = styled("div")`
  flex: 0 1 auto;
  color: white;
  padding: 2ch;
  font-size: 11px;
  font-family: "Fantasque Sans Mono";
`;

const DateContainer = styled(BarItem)`
  background: #3465a4;
  border-radius: 0 5px 5px 0;
`;

export const refreshFrequency = 10000; // ms

export const command = "bash ./funbar/scripts/funbar.sh";

export const render = ({ output }) => {
  let { hostname, time } = JSON.parse(output);
  return (
    <BarContainer>
      <Bar>
        <BarItem>{hostname}</BarItem>
        <DateContainer>{time}</DateContainer>
      </Bar>
    </BarContainer>
  );
};
