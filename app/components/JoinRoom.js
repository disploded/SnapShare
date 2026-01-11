export default function JoinRoom() {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            width: "320px",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Enter code</h2>

          <input
            type="text"
            placeholder="Room code"
            autoFocus
            style={{
              width: "100%",
              padding: "0.6rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "0.6rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
