import { EventDetail } from "../../types";
import colors from "../../constants/colors";

interface EventProps {
  event: EventDetail;
}

function Event({ event }: EventProps) {
  return (
    <div style={styles.container}>
      {event.destinations.map((destination) => {
        return (
          <div key={destination.id} style={styles.destination}>
            <p style={styles.headerText}>{destination.name}</p>
            <div style={styles.destinationCard}>
              <p style={styles.headerText}>
                {destination.suggestions
                  .filter((suggestion) => suggestion.is_primary)
                  .map((suggestion) => suggestion.poi.name)}
              </p>
              <img
                src={
                  destination.suggestions
                    .filter((suggestion) => suggestion.is_primary)
                    .map((suggestion) => suggestion.poi.photo)[0]
                }
                width="30%"
                alt="destination"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Event;

const styles = {
  container: {
    backgroundColor: colors.background,
    width: "40vw",
    height: "100vh",
    padding: 10,
  },
  destination: {
    borderRadius: 10,
  },
  destinationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  destinationCard: {
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${colors.secondary}`,
    borderRadius: 10,
    overflow: "hidden",
  },
  headerText: {
    fontSize: 15,
    color: colors.neutral,
  },
};
