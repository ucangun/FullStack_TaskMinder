import { format } from "date-fns";

const Welcome = () => {
  // Initialize state for current date
  const currentDate = new Date();
  // Format the current date as "EEE, dd MMM HH:mm"
  const formattedDate = format(currentDate, "EEE, dd MMM HH:mm");

  return (
    <div className="welcome">
      <p className="hello">Hello! </p>
      <p className="date">{formattedDate}</p>
    </div>
  );
};

export default Welcome;
