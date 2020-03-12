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

function formatBatteryIndicator({ percentage, charging, remaining }) {
  let suffix = "";
  if (percentage != 100) {
    if (remaining == "(no") {
      suffix = " (calculating)";
    } else {
      suffix = ` (${remaining})`;
    }
  }

  return `${percentage}%${suffix}`;
}

function formatSpotifyIndicator({ track, artist, album }) {
  return `${track} - ${artist}`;
}

export const command = "./funbar/scripts/funbar.sh";

export const refreshFrequency = 10000; // ms

export const initialState = { data: null, error: null };

export const updateState = (event, previousState) => {
  if (event.error) {
    return { data: null, error: event.error };
  }

  let data;
  let error;
  try {
    data = JSON.parse(event.output);
  } catch (e) {
    error = e;
  }
  return { data, error };
};

export const render = ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }

  if (data == null) {
    console.log("Funbar awaiting data");
    return;
  }

  let { ssid, battery, time, spotify } = data;
  return (
    <BarContainer>
      <Bar>
        <BarSegment>
          <WifiContainer>{ssid}</WifiContainer>
        </BarSegment>
        <BarSegment>
          <BarItem>{formatSpotifyIndicator(spotify)}</BarItem>
        </BarSegment>
        <BarSegment>
          <BarItem>{formatBatteryIndicator(battery)}</BarItem>
          <DateContainer>{time}</DateContainer>
        </BarSegment>
      </Bar>
    </BarContainer>
  );
};
