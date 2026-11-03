import useCurrentTime from "../hooks/useCurrentTime";

function LiveClock() {
  const currentTime = useCurrentTime();

  return (
    <div className="card">
      <h2>Live Clock</h2>

      <h3>
        {currentTime.toLocaleTimeString()}
      </h3>

      <p>Time updates every second.</p>
    </div>
  );
}

export default LiveClock;