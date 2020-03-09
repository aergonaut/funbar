import { styled } from "uebersicht";

const BarContainer = styled("div")`
  height: 30px;
  width: 100vw;
`;

const Bar = styled("div")`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background: #212121;
  margin: 5px auto;
  width: 60%;
`;

const BarSegment = styled("div")`
  display: flex;
  flex: 0 1 auto;
  color: white;
  font-size: 11px;
  font-family: "Fantasque Sans Mono";
`;

const BarItem = styled("div")`
  padding: 2ch;
`;

const WifiContainer = styled(BarItem)`
  background: #2e3436;
  border-radius: 5px 0 0 5px;
`;

const DateContainer = styled(BarItem)`
  background: #3465a4;
  border-radius: 0 5px 5px 0;
`;

export const command = "bash ./funbar/scripts/funbar.sh";

export const render = ({ output }) => {
  let { ssid, battery, time, spotify } = JSON.parse(output);
  return (
    <BarContainer>
      <Bar>
        <BarSegment>
          <WifiContainer>{ssid}</WifiContainer>
        </BarSegment>
        <BarSegment>
          <BarItem>{`${spotify.track} - ${spotify.artist}`}</BarItem>
        </BarSegment>
        <BarSegment>
          <BarItem>{`${battery.percentage}%`}</BarItem>
          <DateContainer>{time}</DateContainer>
        </BarSegment>
      </Bar>
    </BarContainer>
  );
};
